"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

const getCardTags = async () => {
  const { data: Tags, error } = await supabase
    .from("Card")
    .select("tags")
    .lt("valid_from", new Date().toISOString());
  if (error) throw new Error("ERROR: getCardTags Failed");

  return Tags;
};

export default getCardTags;
