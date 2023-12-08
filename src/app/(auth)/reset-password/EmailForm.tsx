"use client";

import EmailInput from "@/components/EmailInput";
import SubmitButton from "@/components/SubmitButton";
import { useMemo, useState } from "react";
import { INVALID_EMAIL, validateEmail } from "../util";

type EmailFormProps = {
  authCallback: ({ email }: { email: string }) => Promise<void>;
  buttonText: string;
};
const EmailForm = ({ authCallback, buttonText }: EmailFormProps) => {
  const [isEmailValid, setIsEmailValid] = useState(true);
  const isButtonActive = useMemo(() => isEmailValid, [isEmailValid]);

  const handleIsEmailValid = (email: string) => {
    setIsEmailValid(validateEmail(email));
  };
  const formHandler = async (formData: FormData) => {
    const email = formData.get("email") as string;
    if (!email) alert("정보를 다 입력하세요");
    await authCallback({ email });
  };

  return (
    <div className="w-80">
      <form action={formHandler} className="flex flex-col gap-16">
        <EmailInput
          errorUI={INVALID_EMAIL}
          isEmailValid={isEmailValid}
          handleIsEmailValid={handleIsEmailValid}
        />
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

export default EmailForm;
