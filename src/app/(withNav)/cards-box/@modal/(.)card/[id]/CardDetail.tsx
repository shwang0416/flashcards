import { marked } from "marked";
import parse from "html-react-parser";
import Link from "next/link";
import TagDetail from "./TagDetail";

type CardDetailProps = {
  cardId: string;
  questionTitle: string;
  questionContents: string;
  answerContents: string;
  tags: string[];
};

const CardDetail = ({
  cardId,
  questionTitle,
  questionContents,
  answerContents,
  tags,
}: CardDetailProps) => (
    <div className="w-full h-full flex flex-col gap-y-2 overflow-hidden rounded-xl">
      <h2
        id="question_title"
        placeholder="question_title"
        className="w-full text-[24px] p-4 rounded-xl"
      >
        {questionTitle}
      </h2>
      <TagDetail tagList={tags} />
      <div className="w-full text-lg flex-1 overflow-y-auto">
        <div className="w-full p-4 h-full rounded-xl bg-white  overflow-auto">
          {questionContents &&
            parse(marked(questionContents, { breaks: true }))}
        </div>
      </div>
      <div className="w-full text-lg flex-1 overflow-y-auto flex flex-row gap-2 ">
        <div className="w-full p-4 h-full rounded-xl bg-white  overflow-auto">
          {answerContents && parse(marked(answerContents, { breaks: true }))}
        </div>
      </div>

      <Link
        href={{
          pathname: `/cards-box/card/${cardId}`,
          query: { edit: true },
        }}
        className="font-semibold text-[24px] text-center bg-pink-300 px-6 py-3 rounded-xl hover:bg-pink-400 cursor-pointer text-white"
      >
        Edit
      </Link>
    </div>
  );

export default CardDetail;
