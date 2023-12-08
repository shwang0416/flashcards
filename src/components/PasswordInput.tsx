import debounce from "@/util/debounce";
import { EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { ChangeEvent, useMemo, useState } from "react";

type PasswordInputProps = {
  errorUI: {
    message: string;
  };
  isPasswordValid: boolean;
  handleIsPasswordValid: (email: string) => void;
};
const PasswordInput = ({
  errorUI,
  isPasswordValid,
  handleIsPasswordValid,
}: PasswordInputProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((val) => !val);

  const onPasswordInputChange = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setPassword((event.target as HTMLInputElement).value);
      }, 100),
    [],
  );

  return (
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
            !isPasswordValid ? "border-red-500 outline-red-500" : ""
          }`}
          onChange={onPasswordInputChange}
          onBlur={() => {
            handleIsPasswordValid(password);
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
          {!isPasswordValid && (
            <p className="text-xs text-red-500">{errorUI.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
