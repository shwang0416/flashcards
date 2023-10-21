import getCardById from "@/adaptor/serverActions/getCardByIdAction";
import getPairs from "@/adaptor/serverActions/getPairsAction";
import Notion from "@/components/Notion";

const Page = async ({
  params,
}: {
  params: {
    pairId: string;
  };
}) => {
  const { pairId } = params;
  const pairs = await getPairs();
  const cardIds = pairs.filter((pair) => pair.id === pairId)[0].cardIds;
  const cardsPromise = cardIds.map(async (id) => await getCardById(id));
  const cards = await Promise.all(cardsPromise);
  return (
    <div className="flex bg-amber-300">
      {cards.map((card: any) => (
        <>
          <Notion data={card} pageId={card.id} />
        </>
      ))}
    </div>
  );
};

export default Page;
