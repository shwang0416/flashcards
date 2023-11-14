import Dialog from "@/components/Dialog";
import getUserAction from "@/adaptor/serverActions/auth/getUserAction";
import createCardAction from "@/adaptor/serverActions/createCardAction";
import { generateId } from "@/util/idGenerator";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import getCardDetailAction from "@/adaptor/serverActions/getCardDetail";
import Modal from "@/components/Modal";
import { CARDS_BOX_MODAL_CONTENTS } from "@/data/modalContents";
import updateCardAction from "@/adaptor/serverActions/updateCardAction";
import { Suspense } from "react";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import CardDetail from "./CardDetail";
import CardForm from "./CardForm";

export const dynamic = "force-dynamic";

const ModalPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { edit: boolean };
}) => {
  const { id } = params;
  const { edit } = searchParams;

  if (!id) return null;
  const { data: Cards, error } = await getCardDetailAction({ cardId: id });

  if (error) throw new Error("ERROR: getCardDetailAction failed");

  const updateCard = async ({
    questionTitle,
    questionContents,
    answerContents,
    tags,
  }: any) => {
    "use server";

    await updateCardAction({
      cardId: id,
      questionTitle,
      questionContents,
      answerContents,
      tags,
    });

    // revalidatePath가 안된다
    // revalidatePath(`/`);
    // revalidatePath(`/cards-box/${id}?edit=true`);
    // revalidatePath(`/cards-box/${id}`);
    // revalidatePath("/cards-box");
    revalidatePath(`/cards-box/@modal/${id}`, "page");
    redirect("/cards-box");
  };

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
    console.log("createCardAction");
    revalidatePath("/cards-box");
    redirect("/cards-box");
  };
  if (id === "create-new-card")
    return (
      <Dialog>
        <CardForm cardId={id} submitCallback={createCard} />
      </Dialog>
    );
  if (Cards.length === 0) return <Modal {...CARDS_BOX_MODAL_CONTENTS.error} />;
  const {
    question_title: questionTitle,
    question_contents: questionContents,
    answer_contents: answerContents,
    tags,
  } = Cards[0];

  return (
    <Dialog>
        <Suspense fallback={<LoadingSpinner />}>
          {edit ? (
            <CardForm
              cardId={id}
              submitCallback={updateCard}
              questionTitle={questionTitle}
              questionContents={questionContents}
              answerContents={answerContents}
              tags={tags}
            />
          ) : (
            <CardDetail
              cardId={id}
              questionTitle={questionTitle}
              questionContents={questionContents}
              answerContents={answerContents}
              tags={tags}
            />
          )}
        </Suspense>
      </Dialog>
  );
};

export default ModalPage;
