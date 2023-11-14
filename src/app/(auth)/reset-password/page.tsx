"use client";

import Modal, { ModalContents } from "@/components/Modal";
import { useState } from "react";
import { RESET_PASSWORD_MODAL_CONTENTS } from "@/data/modalContents";
import resetPasswordAction from "@/adaptor/serverActions/auth/resetPasswordAction";
import Link from "next/link";
import EmailForm from "./EmailForm";

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
      <div className="flex flex-col justify-center items-center h-full gap-10">
        <h2 className="text-xl">비밀번호 재설정</h2>
        <div>
          비밀번호를 찾고자하는 이메일 주소를 입력해주세요. <br /> 입력받은
          주소로 비밀번호 초기화 링크를 보내드립니다.
        </div>
        <EmailForm authCallback={formHandler} buttonText="Next" />
        <div className="flex flex-row gap-x-2">
          <span>이미 계정이 있으신가요? </span>
          <Link href="/sign-in" className="underline text-pink-500">
            로그인하기
          </Link>
        </div>
      </div>
    </>
  );
};
export default Page;
