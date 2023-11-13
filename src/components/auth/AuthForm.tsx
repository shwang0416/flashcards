"use client";

import Link from "next/link";

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
    <div className="w-80">
      <form action={formHandler} className="flex flex-col gap-16">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-500">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="h-12 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-gray-500 flex flex-row justify-between"
            >
              <span className="">비밀번호</span>

              <Link
                href="/reset-password"
                className="underline text-gray-400 text-sm leading-loose self-end"
              >
                비밀번호 찾기
              </Link>
            </label>
            <input
              id="password"
              name="password"
              type="text"
              className="h-12 rounded-lg"
            />
          </div>
        </div>

        <div className="">
          <input
            type="submit"
            value={buttonText}
            className="font-semibold w-full bg-pink-300 p-3 rounded-xl hover:bg-pink-400 cursor-pointer text-white"
          />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
