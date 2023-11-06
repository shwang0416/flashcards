import getCardQuestionAction from "@/adaptor/serverActions/getCardQuestionAction";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: Cards, error } = await getCardQuestionAction({ cardId: id });

  if (error) throw new Error("ERROR: getCardQuestionAction failed");
  if (!Cards) throw new Error("ERROR: could not find the card by the id");

  const { question_contents: questionContents, question_title: questionTitle } =
    Cards[0];
  return (
    <div className="flex flex-col pt-4 gap-4 flex-grow">
      <div className=" w-full h-1/2 flex flex-col gap-4">
        <div className="p-4 bg-white rounded-xl">
          <h2 className="text-[50px] font-semibold">{questionTitle}</h2>
        </div>
        <div className="p-4 bg-white rounded-xl flex-grow text-xl">
          {questionContents}
        </div>
      </div>
      <div className=" w-full h-1/2 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-xl">
          <textarea
            className="resize-none p-4 w-full h-full rounded-xl bg-transparent outline-none"
            name="answerContents"
            id="answerContents"
            placeholder="여기에 정답을 입력하세요"
          />
        </div>
        <div className="p-4 bg-white rounded-xl">
          <h2 className="text-[30px] font-semibold">answer markdown</h2>
        </div>
      </div>
    </div>
  );
};

export default Page;
