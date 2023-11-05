"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

const getCardDetailAction = async ({ cardId }: { cardId: string }) => {
  return await supabase.from("Card").select("*").eq("id", cardId);
};

export default getCardDetailAction;
