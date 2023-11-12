import getUserAction from "@/adaptor/serverActions/auth/getUserAction";
import getCardListAction from "@/adaptor/serverActions/getCardListAction";
import CardContainer from "./CardContainer";

const Page = async ({ searchParams }: { searchParams: { d: boolean } }) => {
  const user = await getUserAction();
  if (!user) throw new Error("ERROR: no user");

  const { d: deleteMode } = searchParams;

  const cards = await getCardListAction({ userId: user.id });

  return (
    <div className="flex flex-col gap-4 pt-4 h-full">
      <CardContainer cards={cards} deleteMode={deleteMode} />
    </div>
  );
};

export default Page;
