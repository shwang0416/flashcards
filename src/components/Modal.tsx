"use client";

import { useRouter } from "next/navigation";

export interface ModalContents {
  title: string;
  description: string[];
  buttonText: string;
}

type ModalProps = ModalContents & { buttonCallback?: () => void };

const Modal = ({
  title,
  description,
  buttonText,
  buttonCallback,
}: ModalProps) => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute left-0 right-0 top-[50%] ml-auto mr-auto flex h-fit w-fit min-w-[500px] flex-col items-center gap-y-10 rounded-xl bg-slate-100 p-10 shadow-lg shadow-pink-200 ">
        <h4 className="text-xl font-semibold">{title}</h4>
        <div className="flex flex-col items-center">
          {description.map((elem: string) => (
            <span key={elem}>{elem}</span>
          ))}
        </div>
        <button
          type="button"
          className="bg-pink-300"
          onClick={buttonCallback ?? router.back}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
