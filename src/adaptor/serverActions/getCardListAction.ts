import supabase from "@/lib/supabase/supabase-service-role-client";
import getUserAction from "./auth/getUserAction";
import getUserCards from "../getUserCards";

const getCardListAction = async () => {
  const user = await getUserAction();
  if (!user) throw new Error("ERROR: no user");

  const cardList = await getUserCards(user.id);

  const { data: Cards, error } = await supabase
    .from("Card")
    .select("id, created_at, question_title, tags, difficulty")
    .in("id", cardList ?? [])
    .lt("valid_from", new Date().toISOString());

  if (error) {
    throw new Error("ERROR: getCardListAction failed");
  }

  return Cards;
};

export default getCardListAction;
