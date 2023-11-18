import getCardTags from "@/adaptor/serverActions/getCardTags";
import { cardsToTags } from "@/entity/util/Tag";
import Link from "next/link";
import SelectTagWithButton from "./SelectTagWithButton";

const Page = async () => {
  const data = await getCardTags();

  if (!data || data.length === 0)
    return (
      <div className="jus roundedborder-2 flex h-full flex-col items-center justify-center gap-10 rounded-xl border-2 border-slate-300">
        <h4 className="text-4xl font-semibold">카드가 없습니다</h4>
        <p className="text-lg">
          <Link href="/cards-box" className="text-pink-500 underline">
            Cards Box
          </Link>
          에서 새로운 카드를 등록해보세요
        </p>
      </div>
    );

  const remoteTags = cardsToTags(data);

  //   if (tags.length === 0) return <div className="">등록한 태그가 없습니다 </div>;
  const tags = !remoteTags || remoteTags.length === 0 ? [] : remoteTags;

  return <SelectTagWithButton tags={tags} buttonText="시작하기" />;
};

export default Page;
