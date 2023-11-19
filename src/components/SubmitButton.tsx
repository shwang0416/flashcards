import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import LoadingSpinner from "./loading/LoadingSpinner";

type ButtonProps = {
  buttonText?: string | ReactNode;
};

type ButtonState = "active" | "inactive";

type ButtonStateProps = {
  [key in ButtonState]: ButtonProps;
};
type SubmitButtonProps = {
  disabled?: boolean;
} & ButtonStateProps;

const SubmitButton = ({ active, inactive, disabled }: SubmitButtonProps) => {
  const status = useFormStatus();
  //   const { buttonText = <LoadingSpinner /> } = inactive;

  return (
    <button
      aria-disabled={status.pending || disabled}
      type="submit"
      className={`w-full cursor-pointer rounded-xl px-6 py-3 text-[24px] font-semibold text-white  ${
        status.pending || disabled
          ? "bg-slate-300"
          : "bg-pink-300 hover:bg-pink-400"
      }`}
    >
      {status.pending
        ? inactive.buttonText ?? <LoadingSpinner />
        : active.buttonText}
    </button>
  );
};

export default SubmitButton;
