import Dialog from "@/components/Dialog";
import CardForm from "./CardForm";
import getUserAction from "@/adaptor/serverActions/auth/getUserAction";
import createCardAction from "@/adaptor/serverActions/createCardAction";
import { generateId } from "@/util/idGenerator";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ModalPage = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const { id } = searchParams;
  const user = await getUserAction();
  if (!user) throw new Error("ERROR: no user");

  const createCard = async ({
    questionTitle,
    questionContents,
    answer,
  }: any) => {
    "use server";

    const cardId = generateId(10);
    const user = await getUserAction();

    if (!user) throw new Error("Error: no user. createCard failed");

    await createCardAction({
      cardId,
      userId: user!.id,
      questionTitle,
      questionContents,
      answer,
    });

    revalidatePath("/cards-box");
    redirect("/cards-box");
  };

  return (
    <>
      {id && (
        <Dialog>
          <CardForm cardId={id} submitCallback={createCard} />
        </Dialog>
      )}
    </>
  );
};

export default ModalPage;
