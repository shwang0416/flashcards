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
  if (!buttonCallback) {
    buttonCallback = router.back;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="absolute flex flex-col gap-y-10 items-center bg-slate-100 rounded-xl shadow-lg shadow-pink-200 top-[50%] left-0 right-0 ml-auto mr-auto min-w-[500px] w-fit h-fit p-10 ">
        <h4 className="text-xl font-semibold">{title}</h4>
        <div className="flex flex-col items-center">
          {description.map((elem: string) => (
            <span key={elem}>{elem}</span>
          ))}
        </div>
        <button onClick={buttonCallback}>{buttonText}</button>
      </div>
    </div>
  );
};

export default Modal;
