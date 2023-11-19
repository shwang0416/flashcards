"use client";

import SubmitButton from "@/components/SubmitButton";

type PasswordFormProps = {
  authCallback: ({ password }: { password: string }) => Promise<void>;
  buttonText: string;
};
const PasswordForm = ({ authCallback, buttonText }: PasswordFormProps) => {
  const formHandler = async (formData: FormData) => {
    const password = formData.get("password") as string;

    if (!password) alert("정보를 다 입력하세요");

    await authCallback({ password });
  };
  return (
    <div className="div">
      <form action={formHandler}>
        <div className="">
          <label htmlFor="password">password</label>
          <input id="password" name="password" type="text" />
        </div>
        <div className="">
          <SubmitButton active={{ buttonText }} inactive={{}} />
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
