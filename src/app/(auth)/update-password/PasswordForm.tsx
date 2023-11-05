"use client";

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
          <input
            type="submit"
            value={buttonText}
            className="font-semibold bg-pink-300 p-3 rounded-xl hover:bg-pink-400 cursor-pointer text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
