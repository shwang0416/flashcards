"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

export type updateReviewProps = {
  cardId: string;
  questionTitle: string;
  questionContents: any;
  answerContents: any;
};

const updateReviewAction = async ({
  cardId,
  questionTitle,
  questionContents,
  answerContents,
}: updateReviewProps) => {
  const { error } = await supabase
    .from("Card")
    .update([
      {
        question_title: questionTitle,
        question_contents: questionContents,
        answer_contents: answerContents,
      },
    ])
    .eq("id", cardId)
    .select();
  if (error) {
    console.log(error);
  }
};

export default updateReviewAction;
