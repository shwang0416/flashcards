import getCardById from "@/adaptor/serverActions/getCardByIdAction";
import AskIsCorrectForm from "./AskIsCorrectForm";

const AskIsCorrect = async ({ cardId }: { cardId: string }) => {
  // radio
  const { properties } = await getCardById(cardId);
  const ValidFrom = properties.ValidFrom.date;
  const playCount = properties.PlayCount.number ?? 0;

  return (
    <div className=" h-20 flex flex-col rounded-xl shadow-lg p-4">
      <AskIsCorrectForm
        cardId={cardId}
        ValidFrom={ValidFrom}
        playCount={playCount}
      />
    </div>
  );
};

export default AskIsCorrect;
