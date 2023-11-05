"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

export type CreateCardProps = {
  questionTitle: string;
  questionContents: any;
  answer: any;
};

const createCardAction = async ({
  questionTitle,
  questionContents,
  answer,
}: CreateCardProps) => {
  return await supabase.from("Card").insert([
    {
      question_title: questionTitle,
      question_contents: questionContents,
      answer: answer,
    },
  ]);
};

export default createCardAction;
