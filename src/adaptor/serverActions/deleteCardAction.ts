"use server";

import deleteUserCard from "../deleteUserCard";
import deleteCard from "../deleteCard";

const deleteCardAction = async (cardId: string) => {
  await deleteUserCard(cardId);
  await deleteCard(cardId);
};

export default deleteCardAction;
