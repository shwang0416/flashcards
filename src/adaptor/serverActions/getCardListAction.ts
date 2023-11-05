import supabase from "@/lib/supabase/supabase-service-role-client";

const getCardListAction = async ({ userId }: { userId: string }) => {
  const { data: UserCards } = await supabase
    .from("UserCards")
    .select("card_id")
    .eq("user_id", userId);
  const cardList = UserCards?.map((elem) => elem.card_id);

  const { data: Cards, error } = await supabase
    .from("Card")
    .select("id, created_at, question_title, tag_ids, difficulty")
    .in("id", cardList ?? [])
    .lt("valid_from", new Date().toISOString());

  if (error) {
    throw new Error("ERROR: getCardListAction failed");
  }

  return Cards;
};

export default getCardListAction;
