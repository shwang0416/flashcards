"use client";

import Modal, { ModalContents } from "@/components/Modal";
import AuthForm from "@/components/auth/AuthForm";
import { SIGNUP_MODAL_CONTENTS } from "@/data/modalContents";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useState } from "react";

const Page = () => {
  const [modalContents, setModalContents] = useState<ModalContents | null>();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  );

  const formHandler = async ({ email, password }) => {
    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
      });
      setModalContents(SIGNUP_MODAL_CONTENTS.success);
    } catch (e) {
      console.error(e);
      setModalContents(SIGNUP_MODAL_CONTENTS.error);
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
        <h2 className="text-xl">회원가입 페이지</h2>
        <AuthForm authCallback={formHandler} buttonText="회원 가입" />
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
