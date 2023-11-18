"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";
import getUserCards from "../getUserCards";
import getUserAction from "./auth/getUserAction";

const getCardTags = async () => {
  const user = await getUserAction();

  if (!user) throw new Error("ERROR: no user");

  const cardList = await getUserCards(user.id);

  const { data: Tags, error } = await supabase
    .from("Card")
    .select("tags")
    .in("id", cardList ?? [])
    .lt("valid_from", new Date().toISOString());
  if (error) throw new Error("ERROR: getCardTags Failed");

  return Tags;
};

export default getCardTags;
