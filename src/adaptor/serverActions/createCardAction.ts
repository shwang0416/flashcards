"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

export type CreateCardProps = {
  userId: string;
  cardId: string;
  questionTitle: string;
  questionContents: string;
  answerContents: string;
  tags: string[];
};

const createCardAction = async ({
  userId,
  cardId,
  questionTitle,
  questionContents,
  answerContents,
  tags,
}: CreateCardProps) => {
  try {
    const result = await supabase.from("Card").insert([
      {
        id: cardId,
        question_title: questionTitle,
        question_contents: questionContents,
        answer_contents: answerContents,
        tags,
      },
    ]);
    if (result.error) {
      console.log(result.error);
    }
    const { data, error } = await supabase.from("UserCards").insert([
      {
        user_id: userId,
        card_id: cardId,
      },
    ]);

    if (error) {
      console.log(error);
    }
    console.log(data);
  } catch (e) {
    throw new Error("create Card Action Failed");
  }
};

export default createCardAction;
