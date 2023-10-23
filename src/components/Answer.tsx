import getRecordMapById from "@/adaptor/serverActions/getRecordMapByIdAction";
import ButtonContainer from "@/app/(withSidebar)/[pairId]/[cardId]/ButtonContainer";
import Notion from "@/components/Notion";

const Answer = async ({ cardId }: { cardId: string }) => {
  const recordMap = await getRecordMapById(cardId);

  return (
    <div className="flex flex-col overflow-hidden p-32">
      <Notion data={recordMap} pageId={cardId} className="h-[80%]" />
      <div className="grid grid-cols-2  gap-x-10 justify-items-stretch">
        <ButtonContainer />
      </div>
    </div>
  );
};

export default Answer;
