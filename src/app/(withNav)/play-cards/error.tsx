"use client";

import Link from "next/link";

const Error = () => (
  <div className="flex flex-col h-full items-center justify-center gap-4">
    <h1 className="font-semibold">문제가 발생했습니다</h1>
    <div className="py-64 text-[320px]">💫</div>
    <Link
      href="/"
      className="font-semibold text-[24px] bg-pink-300 px-6 py-3 rounded-xl hover:bg-pink-400 cursor-pointer text-white"
    >
      {" "}
      홈으로{" "}
    </Link>
  </div>
);

export default Error;
