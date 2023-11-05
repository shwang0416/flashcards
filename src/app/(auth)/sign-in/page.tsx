"use client";

import Modal, { ModalContents } from "@/components/Modal";
import Link from "next/link";
import AuthForm from "../../../components/auth/AuthForm";
import { useState } from "react";
import { SIGNIN_MODAL_CONTENTS } from "@/data/modalContents";
import { useRouter } from "next/navigation";
import signInAction from "@/adaptor/serverActions/auth/signinAction";

const Page = () => {
  const [modalContents, setModalContents] = useState<ModalContents | null>();
  const router = useRouter();

  const formHandler = async ({ email, password }) => {
    const { data, error } = await signInAction({ email, password });

    if (error) {
      console.error(error);
      setModalContents(SIGNIN_MODAL_CONTENTS.error);
    } else {
      router.push("/");
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
        <h2 className="text-xl">로그인 페이지</h2>
        <AuthForm authCallback={formHandler} buttonText="Sign in" />
        <div className="flex flex-row gap-x-2">
          <Link href="/sign-up" className="underline text-slate-500">
            회원가입
          </Link>
          <Link href="/reset-password" className="underline text-slate-500">
            비밀번호 찾기
          </Link>
        </div>
      </div>
    </>
  );
};
export default Page;
