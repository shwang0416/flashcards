"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

const getReviewNoteById = async ({ noteId }: { noteId: string }) => {
  const { data: ReviewNote, error } = await supabase
    .from("ReviewNote")
    .select("answer_tried")
    .eq("id", noteId);

  if (error) throw new Error("ERROR: getReviewNoteById failed");
  return ReviewNote[0];
};

export default getReviewNoteById;
