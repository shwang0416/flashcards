"use client";

import { ErrorTypes } from "@/app/(auth)/types";
import debounce from "@/util/debounce";
import { EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ChangeEvent, useMemo, useState } from "react";

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
  errorMessages: ErrorTypes;
};

const AuthForm = ({
  authCallback,
  buttonText,
  validateEmail,
  validatePassword,
  errorMessages,
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailUIValid, setIsEmailUIValid] = useState(true);
  const [isPasswordUIValid, setIsPasswordUIValid] = useState(true);

  const { INVALID_PASSWORD, INVALID_EMAIL } = errorMessages;
  const isButtonActive = useMemo(
    () => validateEmail(email) && validatePassword(password),
    [email, password, validateEmail, validatePassword],
  );

  // const isValid = () => {
  //   if (validateEmail(email)) {
  //     setIsEmailUIValid(false);
  //   }
  // };

  const formHandler = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) alert("정보를 다 입력하세요");

    await authCallback({ email, password });
  };

  const onEmailInputChange = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setEmail((event.target as HTMLInputElement).value);
      }, 100),
    [],
  );

  const onPasswordInputChange = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setPassword((event.target as HTMLInputElement).value);
      }, 100),
    [],
  );

  const toggleShowPassword = () => setShowPassword((val) => !val);

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
              className={`h-12 rounded-lg border-2 border-transparent ${
                !isEmailUIValid ? "border-red-500 outline-red-500" : ""
              }`}
              onChange={onEmailInputChange}
              onBlur={() => {
                setIsEmailUIValid(validateEmail(email));
              }}
            />
            <div className="h-6 px-2 py-1">
              {!isEmailUIValid && (
                <p className="text-xs text-red-500">{INVALID_EMAIL.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="flex flex-row justify-between text-gray-500"
            >
              <span className="">비밀번호</span>

              <Link
                href="/reset-password"
                className="self-end text-sm leading-loose text-gray-400 underline"
              >
                비밀번호 찾기
              </Link>
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className={`h-12 w-full rounded-lg border-2 border-transparent ${
                  !isPasswordUIValid ? "border-red-500 outline-red-500" : ""
                }`}
                onChange={onPasswordInputChange}
                onBlur={() => {
                  console.log("on blur");
                  setIsPasswordUIValid(validatePassword(password));
                }}
              />
              <button
                className="absolute right-4 top-[17%]"
                type="button"
                onClick={toggleShowPassword}
              >
                <EyeIcon
                  className={`h-6 w-6 ${
                    showPassword ? "text-slate-500" : "text-slate-300"
                  }`}
                />
              </button>
              <div className="h-6 px-2 py-1">
                {!isPasswordUIValid && (
                  <p className="text-xs text-red-500">
                    {INVALID_PASSWORD.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <input
            type="submit"
            value={buttonText}
            disabled={!isButtonActive}
            className={`w-full cursor-pointer rounded-xl bg-pink-300 p-3 font-semibold text-white hover:bg-pink-400 disabled:bg-gray-300
            `}
          />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
