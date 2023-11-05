import Dialog from "@/components/Dialog";
import CardForm from "./CardForm";
import getUserAction from "@/adaptor/serverActions/auth/getUserAction";
import createCardAction from "@/adaptor/serverActions/createCardAction";
import { generateId } from "@/util/idGenerator";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import getCardDetailAction from "@/adaptor/serverActions/getCardDetail";
import CardDetail from "./CardDetail";
import Modal from "@/components/Modal";
import { CARDS_BOX_MODAL_CONTENTS } from "@/data/modalContents";

const ModalPage = async ({
  searchParams,
}: {
  searchParams: { id: string; edit: boolean };
}) => {
  const { id, edit } = searchParams;

  if (!id) return null;
  const { data: Cards, error } = await getCardDetailAction({ cardId: id });

  if (error) throw new Error("ERROR: getCardDetailAction failed");

  const createCard = async ({
    questionTitle,
    questionContents,
    answerContents,
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
      answerContents,
    });

    revalidatePath("/cards-box");
    redirect("/cards-box");
  };

  if (Cards.length === 0) return <Modal {...CARDS_BOX_MODAL_CONTENTS.error} />;
  const {
    question_title: questionTitle,
    question_contents: questionContents,
    answer_contents: answerContents,
  } = Cards[0];
  return (
    <>
      {id && (
        <Dialog>
          {edit ? (
            <CardForm cardId={id} submitCallback={createCard} />
          ) : (
            <CardDetail
              cardId={id}
              questionTitle={questionTitle}
              questionContents={questionContents}
              answerContents={answerContents}
            />
          )}
        </Dialog>
      )}
    </>
  );
};

export default ModalPage;
