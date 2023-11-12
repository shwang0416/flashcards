import getCardQuestionAction from "@/adaptor/serverActions/getCardQuestionAction";
import AnswerForm from "./AnswerForm";

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
          <h4 className="h-24 text-4xl font-semibold">{questionTitle}</h4>
        </div>
        <div className="p-4 bg-white rounded-xl flex-grow text-xl">
          {questionContents}
        </div>
      </div>
      <AnswerForm cardId={id} />
    </div>
  );
};

export default Page;
