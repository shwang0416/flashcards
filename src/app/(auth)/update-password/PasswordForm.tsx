"use client";

import { useMemo, useState } from "react";
import SubmitButton from "@/components/SubmitButton";
import PasswordInput from "@/components/PasswordInput";
import { INVALID_PASSWORD } from "../util";

type PasswordFormProps = {
  authCallback: ({ password }: { password: string }) => Promise<void>;
  buttonText: string;
  validatePassword: (password: string) => boolean;
};

const PasswordForm = ({
  authCallback,
  buttonText,
  validatePassword,
}: PasswordFormProps) => {
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const isButtonActive = useMemo(() => isPasswordValid, [isPasswordValid]);

  const handleIsPasswordValid = (email: string) => {
    setIsPasswordValid(validatePassword(email));
  };

  const formHandler = async (formData: FormData) => {
    const password = formData.get("password") as string;

    if (!password) alert("정보를 모두 입력해주세요");

    await authCallback({ password });
  };
  return (
    <div className="div">
      <form action={formHandler}>
        <div className="">
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

export default PasswordForm;
