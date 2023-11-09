import { Suspense } from "react";
import CardItem from "./CardItem";
import NewCardItem from "./NewCardItem";
import getUserAction from "@/adaptor/serverActions/auth/getUserAction";
import getCardListAction from "@/adaptor/serverActions/getCardListAction";
import CardItemSkeleton from "@/components/loading/CardItemSkeleton";

const Page = async () => {
  const user = await getUserAction();
  if (!user) throw new Error("ERROR: no user");

  const cards = await getCardListAction({ userId: user.id });

  return (
    <>
      <div className="flex flex-col gap-4 pt-4">
        <div className="rounded-xl bg-white w-full h-60 flex flex-col justify-end p-6">
          <h2 className="text-[60px] font-semibold mb-6">Cards Box</h2>
          <p className="text-xl ml-2">Add your card</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <NewCardItem />
          <Suspense fallback={<CardItemSkeleton />}>
            {cards.map((card) => (
              <CardItem
                title={card.question_title}
                date={new Date(card.created_at)}
                difficultyLvl={card.difficulty}
                id={card.id}
                key={card.id}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Page;
