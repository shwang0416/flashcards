import getCardTags from "@/adaptor/serverActions/getCardTags";
import { cardsToTags } from "@/entity/util/Tag";
import Link from "next/link";
import SelectTagWithButton from "./SelectTagWithButton";
import NoCards from "./NoCards";

const Page = async () => {
  const data = await getCardTags();

  if (!data || data.length === 0)
    return (
      <div className="p-6">
        <NoCards>
          <p className="text-lg">
            <Link href="/cards-box" className="text-pink-500 underline">
              Cards Box
            </Link>
            에서 새로운 카드를 등록해보세요
          </p>
        </NoCards>
      </div>
    );

  const remoteTags = cardsToTags(data);

  //   if (tags.length === 0) return <div className="">등록한 태그가 없습니다 </div>;
  const tags = !remoteTags || remoteTags.length === 0 ? [] : remoteTags;

  return (
    <div className="p-6">
      <SelectTagWithButton tags={tags} buttonText="시작하기" />
    </div>
  );
};

export default Page;
