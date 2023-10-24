import getRecordMapById from "@/adaptor/serverActions/getRecordMapByIdAction";
import ButtonContainer from "@/app/(withSidebar)/[pairId]/[cardId]/ButtonContainer";
import Notion from "@/components/Notion";
import FeedbackBox from "./FeedbackBox";
import MyAnswer from "./MyAnswer";

const Answer = async ({ cardId }: { cardId: string }) => {
  const recordMap = await getRecordMapById(cardId);

  return (
    <div className="flex flex-col flex-grow overflow-hidden px-32 pb-32">
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <div className="border border-slate-400 mb-4">
            <MyAnswer />
          </div>
          <FeedbackBox />
        </div>
        <div className="flex flex-col">
          <div className="h-80 border border-slate-400">
            <Notion data={recordMap} pageId={cardId} />
          </div>
          <div className="flex w-full flex-grow items-end">
            <ButtonContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;
