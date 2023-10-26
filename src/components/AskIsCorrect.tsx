import getCardById from "@/adaptor/serverActions/getCardByIdAction";
import AskIsCorrectForm from "./AskIsCorrectForm";

const AskIsCorrect = async ({ cardId }: { cardId: string }) => {
  // radio
  const { properties } = await getCardById(cardId);
  const correctCount = properties.CorrectCount.number ?? 0;
  const playCount = properties.PlayCount.number ?? 0;

  return (
    <div className=" h-60 flex flex-col rounded-xl shadow-lg p-12">
      <h6 className="text-lg font-medium pb-10">정답을 맞추셨나요?</h6>
      <AskIsCorrectForm
        cardId={cardId}
        correctCount={correctCount}
        playCount={playCount}
      />
    </div>
  );
};

export default AskIsCorrect;
