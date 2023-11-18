import Link from "next/link";

const NoCards = () => {
  return (
    <div className="flex h-full flex-grow flex-col  gap-4 pt-4">
      <div className="flex flex-col items-center rounded-xl  bg-white p-4">
        <h4 className="h-24 text-4xl font-semibold underline decoration-slate-200 decoration-double">
          카드가 없습니다
        </h4>
        <Link href="/play-cards" className="button-default">
          돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NoCards;
