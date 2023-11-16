"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const Dialog = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const backdropClickHandler = () => {
    router.push("/cards-box");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute left-0 right-0 top-[10%] ml-auto mr-auto flex h-[80%] w-[80%] min-w-[500px] flex-col items-center rounded-xl bg-slate-100 p-6 shadow-xl shadow-pink-200 backdrop-blur-lg ">
        <button
          className="mb-4 flex w-full justify-end"
          onClick={backdropClickHandler}
          type="button"
        >
          <XMarkIcon className="h-6 w-6 cursor-pointer rounded text-gray-600 hover:bg-pink-200 hover:text-white" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
