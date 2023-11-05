"use client";

import Modal, { ModalContents } from "@/components/Modal";
import { useState } from "react";
import { RESET_PASSWORD_MODAL_CONTENTS } from "@/data/modalContents";
import EmailForm from "./EmailForm";
import resetPasswordAction from "@/adaptor/serverActions/auth/resetPasswordAction";

const Page = () => {
  const [modalContents, setModalContents] = useState<ModalContents | null>();

  const formHandler = async ({ email }) => {
    const { data, error } = await resetPasswordAction({ email });
    if (error) {
      console.error(error);
      setModalContents(RESET_PASSWORD_MODAL_CONTENTS.error);
    } else {
      setModalContents(RESET_PASSWORD_MODAL_CONTENTS.success);
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
        <h2 className="text-xl">비밀번호 리셋</h2>
        <p>비밀번호를 찾고자하는 아이디를 입력해주세요.</p>
        <EmailForm authCallback={formHandler} buttonText="Next" />
      </div>
    </>
  );
};
export default Page;
