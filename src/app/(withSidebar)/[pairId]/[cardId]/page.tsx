import getCardById from "@/adaptor/serverActions/getCardByIdAction";
import Notion from "@/components/Notion";
import ButtonContainer from "./ButtonContainer";

const Page = async ({
  params,
}: {
  params: {
    cardId: string;
  };
}) => {
  const { cardId } = params;
  const currendCardData = await getCardById(cardId);

  return (
    <div className="flex flex-col overflow-hidden p-32">
      <Notion data={currendCardData} pageId={cardId} className="h-[80%]" />
      <div className="grid grid-cols-2  gap-x-10 justify-items-stretch">
        <ButtonContainer />
      </div>
    </div>
  );
};

export default Page;
