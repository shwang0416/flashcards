"use client";

import Modal, { ModalContents } from "@/components/Modal";
import Link from "next/link";
import { useState } from "react";
import { SIGNIN_MODAL_CONTENTS } from "@/data/modalContents";
import { useRouter } from "next/navigation";
import signInAction from "@/adaptor/serverActions/auth/signinAction";
import AuthForm from "../../../components/auth/AuthForm";
import { SIGN_IN_ERRORS, validateEmail, validatePassword } from "./util";

const Page = () => {
  const [modalContents, setModalContents] = useState<ModalContents | null>();
  const router = useRouter();

  const formHandler = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { error } = await signInAction({ email, password });

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
      <div className="flex h-full flex-col items-center justify-center gap-10">
        <h2 className="text-xl">Welcome Back</h2>
        <AuthForm
          authCallback={formHandler}
          buttonText="로그인"
          validateEmail={validateEmail}
          validatePassword={validatePassword}
          errorMessages={SIGN_IN_ERRORS}
        />
        <div className="flex flex-row gap-x-2">
          <span>계정이 없으신가요? </span>
          <Link href="/sign-up" className="text-pink-500 underline">
            가입하기
          </Link>
        </div>
      </div>
    </>
  );
};
export default Page;
