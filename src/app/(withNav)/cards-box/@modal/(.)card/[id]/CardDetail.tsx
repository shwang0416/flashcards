import Link from "next/link";

type CardDetailProps = {
  cardId: string;
  questionTitle: string;
  questionContents: JSON;
  answerContents: JSON;
};

const CardDetail = ({
  cardId,
  questionTitle,
  questionContents,
  answerContents,
}: CardDetailProps) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-y-2 w-full h-full">
        <h2
          id="question_title"
          placeholder="question_title"
          className="w-full text-[24px] p-4 rounded-xl"
        >
          {questionTitle}
        </h2>
        <div className="flex flex-col flex-grow gap-y-2">
          <div className="w-full text-lg h-1/2 flex flex-row gap-2">
            <div className="w-full p-4 h-full rounded-xl bg-white">
              {JSON.stringify(questionContents)}
            </div>
          </div>
          <div className="w-full text-lg h-1/2 flex flex-row gap-2">
            <div className="w-full p-4 h-full rounded-xl bg-white">
              {JSON.stringify(answerContents)}
            </div>
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
    </div>
  );
};

export default CardDetail;
