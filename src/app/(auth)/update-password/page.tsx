"use client";

import Modal, { ModalContents } from "@/components/Modal";
import { useState } from "react";
import { RESET_PASSWORD_MODAL_CONTENTS } from "@/data/modalContents";
import { useRouter } from "next/navigation";
import updatePasswordAction from "@/adaptor/serverActions/auth/updatePasswordAction";
import PasswordForm from "./PasswordForm";

const Page = () => {
  const [modalContents, setModalContents] = useState<ModalContents | null>();

  const formHandler = async ({ password }) => {
    const { data, error } = await updatePasswordAction({ password });

    if (error) {
      console.error(error);
      setModalContents(RESET_PASSWORD_MODAL_CONTENTS.error);
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
      <div className="flex flex-col gap-10">
        <h2 className="text-xl">새로운 비밀번호를 입력해주세요</h2>
        <PasswordForm authCallback={formHandler} buttonText="Sign in" />
      </div>
    </>
  );
};
export default Page;
