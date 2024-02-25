"use client";

import Modal, { ModalContents } from "@/components/Modal";
import { useState } from "react";
import { UPDATE_PASSWORD_MODAL_CONTENTS } from "@/data/modalContents";
import updatePasswordAction from "@/adaptor/serverActions/auth/updatePasswordAction";
import PasswordForm from "./PasswordForm";
import { validatePassword } from "../util";
import { useRouter } from "next/navigation";

const Page = () => {
  const [modalContents, setModalContents] = useState<ModalContents | null>();
  const router = useRouter();
  const formHandler = async ({ password }: { password: string }) => {
    try {
      await updatePasswordAction({ password });
      router.replace("/");
    } catch (error) {
      console.error(error);
      setModalContents(UPDATE_PASSWORD_MODAL_CONTENTS.error);
    }
  };

  return (
    <>
      {modalContents && (
        <Modal
          {...modalContents}
          buttonCallback={() => setModalContents(null)}
        />
      )}
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <h2 className="text-xl">새로운 비밀번호를 입력해주세요</h2>

        <PasswordForm
          authCallback={formHandler}
          buttonText="Submit"
          validatePassword={validatePassword}
        />
      </div>
    </>
  );
};
export default Page;
