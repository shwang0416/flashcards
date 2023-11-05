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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="backdrop-blur-lg absolute flex flex-col items-center bg-slate-100 rounded-xl shadow-xl shadow-pink-200 top-[10%] left-0 right-0 ml-auto mr-auto min-w-[500px] w-[80%] h-[80%] p-6 ">
        <button
          className="p-0 w-full flex justify-end mb-4 bg-transparent hover:bg-transparent"
          onClick={backdropClickHandler}
        >
          <XMarkIcon className="w-6 h-6 text-gray-600 hover:bg-pink-200 hover:text-white rounded cursor-pointer" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
