"use server";

import { revalidatePath } from "next/cache";
import deleteCardAction from "./deleteCardAction";

const deleteCardsAction = async (cardIds: string[]) => {
  // promiseAll
  Promise.all(cardIds.map((id) => deleteCardAction(id)))
  .catch((error) => console.error(error));

  revalidatePath("/cards-box");
};

export default deleteCardsAction;
