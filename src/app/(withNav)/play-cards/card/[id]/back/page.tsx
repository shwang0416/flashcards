import getCardDetailAction from "@/adaptor/serverActions/getCardDetail";
import getReviewNoteById from "@/adaptor/serverActions/getReviewNoteById";
import getNextCardIdFromCookie from "@/adaptor/serverActions/getNextCardIdFromCookie";
import ReviewForm from "./ReviewForm";
import { marked } from "marked";
import parse from "html-react-parser";

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { r: string };
}) => {
  const { id } = params;
  const { r } = searchParams;
  if (!id || !r) throw new Error("ERROR: card Id or note id is missing");

  const { data: Cards, error } = await getCardDetailAction({ cardId: id });
  if (error) throw new Error("ERROR: getCardDetailAction failed");

  const ReviewNote = await getReviewNoteById({ noteId: r });

  if (!ReviewNote) throw new Error("no answer data in review notes");

  const { answer_tried: answerTried } = ReviewNote;

  if (!Cards) throw new Error("ERROR: could not find the card by the id");

  const nextCardId = getNextCardIdFromCookie(id);
  const {
    question_contents: questionContents,
    question_title: questionTitle,
    answer_contents: answerContents,
  } = Cards[0];

  return (
    <div className="flex h-full flex-grow flex-col gap-4 pt-4">
      <div className=" flex h-1/2 w-full flex-col gap-4">
        <div className="rounded-xl bg-white p-4">
          <h4 className="h-24 text-4xl font-semibold underline decoration-slate-200 decoration-double">
            {questionTitle}
          </h4>
        </div>
        <div className="grid flex-grow grid-cols-3 gap-4 text-xl">
          <div className="flex-grow break-words rounded-xl border border-gray-200 bg-white p-4">
            {questionContents &&
              parse(marked(questionContents, { breaks: true }))}
          </div>
          <div className="flex-grow break-words rounded-xl border border-gray-200 bg-white p-4">
            {answerContents && parse(marked(answerContents, { breaks: true }))}
          </div>
          <div className="flex-grow break-words rounded-xl border border-gray-200 bg-white p-4">
            {answerTried && parse(marked(answerTried, { breaks: true }))}
          </div>
        </div>
      </div>
      <ReviewForm noteId={r} nextCardId={nextCardId} />
    </div>
  );
};

export default Page;
