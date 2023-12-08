import debounce from "@/util/debounce";
import { useState, useMemo, ChangeEvent } from "react";

type EmailInputProps = {
  errorUI: {
    message: string;
  };
  isEmailValid: boolean;
  handleIsEmailValid: (email: string) => void;
};
const EmailInput = ({
  errorUI,
  isEmailValid,
  handleIsEmailValid,
}: EmailInputProps) => {
  const [email, setEmail] = useState("");
  const onEmailInputChange = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setEmail((event.target as HTMLInputElement).value);
      }, 100),
    [],
  );

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="email" className="text-gray-500">
        이메일
      </label>
      <input
        id="email"
        name="email"
        type="text"
        className={`h-12 rounded-lg border-2 border-transparent ${
          !isEmailValid ? "border-red-500 outline-red-500" : ""
        }`}
        onChange={onEmailInputChange}
        onBlur={() => {
          handleIsEmailValid(email);
        }}
      />
      <div className="h-6 px-2 py-1">
        {!isEmailValid && (
          <p className="text-xs text-red-500">{errorUI.message}</p>
        )}
      </div>
    </div>
  );
};

export default EmailInput;
