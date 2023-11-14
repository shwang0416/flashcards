"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

const findReviewNotesByCardIdAction = async ({
  cardId,
}: {
  cardId: string;
}) => {
  const { data } = await supabase
    .from("CardReviewNotes")
    .select("review_note_id")
    .eq("id", cardId);

  if (!data) return null;
  const { review_note_id: reviewNoteId } = data[0];

  const { data: ReviewNote, error } = await supabase
    .from("ReviewNote")
    .select("answer_tried")
    .eq("id", reviewNoteId);

  if (error) throw new Error("ERROR: findReviewNotesByCardIdAction failed");
  return ReviewNote;
};

export default findReviewNotesByCardIdAction;
