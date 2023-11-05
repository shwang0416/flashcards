import CardItem from "./CardItem";
import NewCardItem from "./NewCardItem";
import getUserAction from "@/adaptor/serverActions/auth/getUserAction";
import getCardListAction from "@/adaptor/serverActions/getCardListAction";

const Page = async () => {
  const user = await getUserAction();
  if (!user) throw new Error("ERROR: no user");

  const cards = await getCardListAction({ userId: user.id });

  return (
    <>
      <div className="flex flex-col gap-4 pt-4">
        <div className="rounded-xl bg-white w-full h-60 flex flex-col justify-end p-6">
          <h2 className="text-[60px] font-semibold">Cards Box</h2>
          <p className="text-xl">Add your card</p>
        </div>
        <div className="flex flex-row gap-4">
          <NewCardItem />
          {cards.map((card) => (
            <CardItem
              title={card.question_title}
              date={new Date(card.created_at)}
              difficultyLvl={card.difficulty}
              id={card.id}
              key={card.id}
            />
          ))}
          <CardItem
            title={"여기는 바로 문제 제목이 들어가는 자리"}
            date={new Date()}
            difficultyLvl={3}
            id="mock-id"
          />
        </div>
      </div>
    </>
  );
};

export default Page;
