import getCardListAction from "@/adaptor/serverActions/getCardListAction";
import { cardsToTags } from "@/entity/util/Tag";
import SelectTagCardContainer from "./SelectTagCardContainer";

const Page = async ({ searchParams }: { searchParams: { d: boolean } }) => {
  const { d: deleteMode } = searchParams;
  const cards = await getCardListAction();
  const tags = cardsToTags(cards);

  return (
    <SelectTagCardContainer
      cards={cards}
      remoteTags={tags}
      deleteMode={deleteMode}
    />
  );
};

export default Page;
