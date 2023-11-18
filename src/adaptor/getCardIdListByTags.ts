"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

const getCardIdListByTags = async (
  cardList: string[] | undefined,
  tags: string[],
) => {
  const { data: Cards, error } = await supabase
    .from("Card")
    .select("id")
    .in("id", cardList ?? [])
    .overlaps("tags", tags ?? [])
    .lt("valid_from", new Date().toISOString());

  if (error) {
    throw new Error("ERROR: getCardIdListByTags failed");
  }
  return Cards;
};
export default getCardIdListByTags;
