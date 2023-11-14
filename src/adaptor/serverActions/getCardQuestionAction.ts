"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

const getCardQuestionAction = async ({ cardId }: { cardId: string }) =>
  supabase
    .from("Card")
    .select("question_title, question_contents")
    .eq("id", cardId);

export default getCardQuestionAction;
