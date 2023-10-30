import getRecordMapById from "@/adaptor/serverActions/getRecordMapByIdAction";
import Notion from "@/components/Notion";
import AskIsCorrect from "./AskIsCorrect";

const Answer = async ({ cardId }: { cardId: string }) => {
  const recordMap = await getRecordMapById(cardId);

  return (
    <div className="flex flex-col flex-grow justify-end overflow-hidden px-10 pb-12">
      <div className="flex flex-col-reverse flex-grow gap-4">
        <div className="flex w-full justify-center">
          <AskIsCorrect cardId={cardId} />
        </div>
        <div className="h-80 border flex-grow  border-slate-400 overflow-auto">
          <Notion data={recordMap} pageId={cardId} />
        </div>
      </div>
    </div>
  );
};

export default Answer;
