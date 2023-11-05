import createCardAction, {
  CreateCardProps,
} from "@/adaptor/serverActions/createCardAction";
import CardForm from "./CardForm";
import CardItem from "./CardItem";
import NewCardItem from "./NewCardItem";
import Dialog from "@/components/Dialog";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const Page = ({ searchParams }: { searchParams: { id: string } }) => {
  const { id } = searchParams;

  const action = async ({
    questionTitle,
    questionContents,
    answer,
  }: CreateCardProps) => {
    "use server";

    const { data, error } = await createCardAction({
      questionTitle,
      questionContents,
      answer,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/cards-box");
    redirect("/cards-box");
  };
  return (
    <>
      {id && (
        <Dialog>
          <CardForm id={id} submitCallback={action} />
        </Dialog>
      )}

      <div className="flex flex-col gap-4 pt-4">
        <div className="rounded-xl bg-white w-full h-60 flex flex-col justify-end p-6">
          <h2 className="text-[60px] font-semibold">Cards Box</h2>
          <p className="text-xl">Add your card</p>
        </div>
        <div className="flex flex-row gap-4">
          <NewCardItem />
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
