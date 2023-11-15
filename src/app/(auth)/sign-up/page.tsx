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

  const formHandler = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.VERCEL_URL}/sign-in`,
      },
    });

    if (error) {
      setModalContents(SIGNUP_MODAL_CONTENTS.error);
      throw new Error("ERROR: signUp failed");
    }
    setModalContents(SIGNUP_MODAL_CONTENTS.success);
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
        <h2 className="text-xl">회원가입 페이지</h2>
        <AuthForm authCallback={formHandler} buttonText="회원 가입" />
        <div className="flex flex-row gap-x-2">
          <span>이미 계정이 있으신가요? </span>
          <Link href="/sign-in" className="text-pink-500 underline">
            로그인하기
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
