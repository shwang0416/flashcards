import { cookies } from "next/headers";
import Link from "next/link";

const Page = async () => {
  const firstCardIdCookie = cookies().get("first-card-id")?.value;
  return (
    <div className="flex flex-col pt-4 gap-4 flex-grow">
      <div className="p-4 py-10 bg-white rounded-xl">
        <h2 className="text-[50px] font-semibold">Play Cards</h2>
      </div>

      <div className="flex justify-center items-center h-full">
        <Link
          className="p-10 text-white text-[30px] font-medium bg-pink-500 rounded-full hover:bg-pink-400 hover:shadow-xl hover:shadow-yellow-200"
          href={`/play-cards/card/${firstCardIdCookie}`}
        >
          Push!
        </Link>
        {/* 옵션 선택 form (태그 -> 태그리스트, all) */}
      </div>
    </div>
  );
};

export default Page;
