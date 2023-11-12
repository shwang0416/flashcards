"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";
import { revalidatePath } from "next/cache";

const deleteCardsAction = async (cardIds: string[]) => {
  const { error } = await supabase
    .from("UserCards")
    .delete()
    .eq("card_id", cardIds);
  if (error) {
    console.log(error);
  }

  const result = await supabase.from("Card").delete().eq("id", cardIds);
  if (result.error) {
    console.log(result.error);
  }

  revalidatePath("/cards-box");
};

export default deleteCardsAction;
