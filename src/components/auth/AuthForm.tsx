"use client";

type AuthFormProps = {
  authCallback: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  buttonText: string;
};
const AuthForm = ({ authCallback, buttonText }: AuthFormProps) => {
  const formHandler = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) alert("정보를 다 입력하세요");

    await authCallback({ email, password });
  };
  return (
    <div className="div">
      <form action={formHandler}>
        <div className="">
          <label htmlFor="email">email</label>
          <input id="email" name="email" type="text" />
        </div>
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

export default AuthForm;
