"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

export type createReviewProps = {
  userId: string;
  cardId: string;
  noteId: string;
  answerContents: string;
};

const createReviewAction = async ({
  userId,
  cardId,
  noteId,
  answerContents,
}: createReviewProps) => {
  //FIXME: 프로미스 체인? 하나가 실패하면 모두가 실패하게 처리 해야함

  try {
    await supabase.from("ReviewNote").insert([
      {
        id: noteId,
        answer_tried: answerContents,
      },
    ]);

    await supabase.from("CardReviewNotes").insert([
      {
        card_id: cardId,
        review_note_id: noteId,
      },
    ]);

    await supabase.from("UserReviewNotes").insert([
      {
        user_id: userId,
        review_note_id: noteId,
      },
    ]);
  } catch (e) {
    throw new Error("ERROR: create review action failed");
  }
};

export default createReviewAction;
