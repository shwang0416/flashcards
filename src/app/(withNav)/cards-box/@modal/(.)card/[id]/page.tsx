import getUserAction from "@/adaptor/serverActions/auth/getUserAction";
import createCardAction from "@/adaptor/serverActions/createCardAction";
import { generateId } from "@/util/idGenerator";
import getCardDetailAction from "@/adaptor/serverActions/getCardDetail";
import Modal from "@/components/Modal";
import { CARDS_BOX_MODAL_CONTENTS } from "@/data/modalContents";
import updateCardAction from "@/adaptor/serverActions/updateCardAction";
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

  type UpdateCardProps = {
    questionTitle: string;
    questionContents: string;
    answerContents: string;
    tags: string[];
  };
  const updateCard = async ({
    questionTitle,
    questionContents,
    answerContents,
    tags,
  }: UpdateCardProps) => {
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
  };

  type CreateCardProps = {
    questionTitle: string;
    questionContents: string;
    answerContents: string;
    tags: string[];
  };
  const createCard = async ({
    questionTitle,
    questionContents,
    answerContents,
    tags,
  }: CreateCardProps) => {
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
      tags,
    });
  };
  if (id === "create-new-card")
    return (
      <CardForm cardId={id} submitCallback={createCard} nextPath="/cards-box" />
    );
  if (Cards.length === 0) return <Modal {...CARDS_BOX_MODAL_CONTENTS.error} />;
  const {
    question_title: questionTitle,
    question_contents: questionContents,
    answer_contents: answerContents,
    tags,
  } = Cards[0];

  if (edit) {
    return (
      <CardForm
        cardId={id}
        submitCallback={updateCard}
        questionTitle={questionTitle}
        questionContents={questionContents}
        answerContents={answerContents}
        tags={tags}
        nextPath="/cards-box"
      />
    );
  }
  return (
    <CardDetail
      cardId={id}
      questionTitle={questionTitle}
      questionContents={questionContents}
      answerContents={answerContents}
      tags={tags}
    />
  );
};

export default ModalPage;
