import getUserAction from "@/adaptor/serverActions/auth/getUserAction";
import getCardListAction from "@/adaptor/serverActions/getCardListAction";
import SelectTagCardContainer from "./SelectTagCardContainer";

const Page = async ({ searchParams }: { searchParams: { d: boolean } }) => {
  const { d: deleteMode } = searchParams;
  const user = await getUserAction();
  if (!user) throw new Error("ERROR: no user");

  const cards = await getCardListAction({ userId: user.id });

  return (
    <div className="flex h-full flex-col gap-4 pt-4">
      <SelectTagCardContainer cards={cards} deleteMode={deleteMode} />
    </div>
  );
};

export default Page;
