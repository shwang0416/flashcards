import getCardTags from "@/adaptor/serverActions/getCardTags";
import { cardsToTags } from "@/entity/util/Tag";
import SelectTagWithButton from "./SelectTagWithButton";

const Page = async () => {
  const data = await getCardTags();

  if (!data || data.length === 0)
    return (
      <div className="">
        카드가 없습니다 Cards Box에서 새로운 카드를 등록해보세요
      </div>
    );

  const remoteTags = cardsToTags(data);

  //   if (tags.length === 0) return <div className="">등록한 태그가 없습니다 </div>;
  const tags = !remoteTags || remoteTags.length === 0 ? [] : remoteTags;

  return <SelectTagWithButton tags={tags} buttonText="시작하기" />;
};

export default Page;
