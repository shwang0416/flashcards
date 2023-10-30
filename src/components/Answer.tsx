import getRecordMapById from "@/adaptor/serverActions/getRecordMapByIdAction";
import Notion from "@/components/Notion";
import AskIsCorrect from "./AskIsCorrect";

const Answer = async ({ cardId }: { cardId: string }) => {
  const recordMap = await getRecordMapById(cardId);

  return (
    <div className="flex flex-col flex-grow overflow-hidden px-32 pb-32">
      <div className="">
        <div className="flex flex-col">
          <div className="h-80 border border-slate-400">
            <Notion data={recordMap} pageId={cardId} />
          </div>
          <div className="flex w-full flex-grow items-end">
            <AskIsCorrect cardId={cardId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;
