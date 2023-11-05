"use client";

import Modal, { ModalContents } from "@/components/Modal";
import AuthForm from "@/components/auth/AuthForm";
import { SIGNUP_MODAL_CONTENTS } from "@/data/authContents";
import { createBrowserClient } from "@supabase/ssr";
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
      <div className="flex flex-col gap-10">
        <h2 className="text-xl">회원가입 페이지</h2>
        <AuthForm authCallback={formHandler} buttonText="Sign up" />
      </div>
    </>
  );
};

export default Page;
