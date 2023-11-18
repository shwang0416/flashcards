"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

const getCardIdListByAllTags = async (cardList: string[] | undefined) => {
  const { data: Cards, error } = await supabase
    .from("Card")
    .select("id")
    .in("id", cardList ?? [])
    .lt("valid_from", new Date().toISOString());

  if (error) {
    throw new Error("ERROR: getCardIdListByAllTags failed");
  }
  return Cards;
};
export default getCardIdListByAllTags;
