"use client";

import Link from "next/link";

const Error = () => {
  return (
    <div className="">
      <h2>에러 발생</h2>
      <p>카드를 찾을 수 없습니다</p>
      <Link href="/">홈으로</Link>
    </div>
  );
};

export default Error;
