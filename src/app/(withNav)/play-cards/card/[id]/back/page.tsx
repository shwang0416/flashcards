import getCardDetailAction from "@/adaptor/serverActions/getCardDetail";
import ReviewForm from "../back/ReviewForm";
import getReviewNoteById from "@/adaptor/serverActions/getReviewNoteById";
import getNextCardIdFromCookie from "@/adaptor/serverActions/getNextCardIdFromCookie";

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
    <div className="flex flex-col pt-4 gap-4 flex-grow">
      <div className=" w-full h-1/2 flex flex-col gap-4">
        <div className="p-4 bg-white rounded-xl">
          <h4 className="h-24 text-4xl font-semibold">{questionTitle}</h4>
        </div>
        <div className="flex flex-row gap-4 flex-grow text-xl">
          <div className="flex-grow bg-white rounded-xl p-4">
            {questionContents}
          </div>
          <div className="flex-grow bg-white rounded-xl p-4">
            {answerContents}
          </div>
          <div className="flex-grow bg-white rounded-xl p-4">{answerTried}</div>
        </div>
      </div>

      {/* props를 잘 넘겨서 정답이랑 오답노트 둘 다 입력받을 수 있도록 컴포넌트를 재사용하자 */}
      <ReviewForm noteId={r} nextCardId={nextCardId} />
    </div>
  );
};

export default Page;
