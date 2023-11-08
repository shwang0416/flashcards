"use server";

import supabase from "@/lib/supabase/supabase-service-role-client";

export type updateReviewProps = {
  noteId: string;
  reviewContents: string;
};

const updateReviewAction = async ({
  noteId,
  reviewContents,
}: updateReviewProps) => {
  const { error } = await supabase
    .from("ReviewNote")
    .update([
      {
        review_contents: reviewContents,
      },
    ])
    .eq("id", noteId)
    .select();
  if (error) {
    console.log(error);
  }
};

export default updateReviewAction;
