"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

export type UpdateCardProps = {
  cardId: string;
  questionTitle: string;
  questionContents: string;
  answerContents: string;
  tags: string[];
};

const updateCardAction = async ({
  cardId,
  questionTitle,
  questionContents,
  answerContents,
  tags,
}: UpdateCardProps) => {
  const { data, error } = await supabase
    .from("Card")
    .update([
      {
        question_title: questionTitle,
        question_contents: questionContents,
        answer_contents: answerContents,
        tags,
      },
    ])
    .eq("id", cardId)
    .select();
  if (error) {
    console.log(error);
  }
  console.log(data);
};

export default updateCardAction;
