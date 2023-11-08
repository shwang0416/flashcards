import { cookies } from "next/headers";
import Link from "next/link";

const Page = async () => {
  const firstCardIdCookie = cookies().get("first-card-id")?.value;
  if (!firstCardIdCookie) {
    throw new Error("쿠키에 첫번째 카드정보가 없음");
  }
  return (
    <div className="flex flex-col pt-4 gap-4 flex-grow">
      <div className="p-4 bg-white rounded-xl">
        <h2 className="text-[50px] font-semibold">Play Cards</h2>
      </div>

      <div className="">
        <Link href={`/play-cards/card/${firstCardIdCookie}`}>
          누르면 플레이 스타트
        </Link>
        {/* 옵션 선택 form (태그 -> 태그리스트, all) */}
      </div>
    </div>
  );
};

export default Page;
