import getCardListAction from "@/adaptor/serverActions/getCardListAction";
import SelectTagCardContainer from "./SelectTagCardContainer";

const Page = async ({ searchParams }: { searchParams: { d: boolean } }) => {
  const { d: deleteMode } = searchParams;
  const cards = await getCardListAction();

  return (
    <div className="flex h-full flex-col gap-4 pt-4">
      <SelectTagCardContainer cards={cards} deleteMode={deleteMode} />
    </div>
  );
};

export default Page;
