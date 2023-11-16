import getCardQuestionAction from "@/adaptor/serverActions/getCardQuestionAction";
import AnswerForm from "./AnswerForm";
import { marked } from "marked";
import parse from "html-react-parser";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: Cards, error } = await getCardQuestionAction({ cardId: id });

  if (error) throw new Error("ERROR: getCardQuestionAction failed");
  if (!Cards) throw new Error("ERROR: could not find the card by the id");

  const { question_contents: questionContents, question_title: questionTitle } =
    Cards[0];

  return (
    <div className="flex h-full flex-grow flex-col gap-4 pt-4">
      <div className="flex h-1/2 w-full flex-col gap-4">
        <div className="rounded-xl  bg-white p-4">
          <h4 className="h-24 text-4xl font-semibold underline decoration-slate-200 decoration-double">
            {questionTitle}
          </h4>
        </div>
        <div className="flex-grow rounded-xl bg-white p-4 text-xl">
          {questionContents &&
            parse(marked(questionContents, { breaks: true }))}
        </div>
      </div>
      <AnswerForm cardId={id} />
    </div>
  );
};

export default Page;
