"use client";

import { useMemo, useState } from "react";
import { INVALID_EMAIL, INVALID_PASSWORD } from "@/app/(auth)/util";
import SubmitButton from "../SubmitButton";
import EmailInput from "../EmailInput";
import PasswordInput from "../PasswordInput";

type AuthFormProps = {
  authCallback: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  buttonText: string;
  validateEmail: (email: string) => boolean;
  validatePassword: (password: string) => boolean;
};

const AuthForm = ({
  authCallback,
  buttonText,
  validateEmail,
  validatePassword,
}: AuthFormProps) => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const isButtonActive = useMemo(
    () => isEmailValid && isPasswordValid,
    [isEmailValid, isPasswordValid],
  );

  const handleIsEmailValid = (email: string) => {
    setIsEmailValid(validateEmail(email));
  };
  const handleIsPasswordValid = (email: string) => {
    setIsPasswordValid(validatePassword(email));
  };

  const formHandler = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) alert("정보를 다 입력하세요");

    await authCallback({ email, password });
  };

  return (
    <div className="w-80">
      <form action={formHandler} className="flex flex-col gap-16">
        <div className="flex flex-col gap-3">
          <EmailInput
            errorUI={INVALID_EMAIL}
            isEmailValid={isEmailValid}
            handleIsEmailValid={handleIsEmailValid}
          />
          <PasswordInput
            errorUI={INVALID_PASSWORD}
            isPasswordValid={isPasswordValid}
            handleIsPasswordValid={handleIsPasswordValid}
          />
        </div>

        <div className="">
          <SubmitButton
            active={{ buttonText }}
            inactive={{}}
            disabled={!isButtonActive}
          />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
