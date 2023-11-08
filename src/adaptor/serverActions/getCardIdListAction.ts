import supabase from "@/lib/supabase/supabase-service-role-client";

type GetCardListActionProps = {
  userId: string;
  tags?: string[];
  filterValidFrom?: boolean;
};

/**
 * 여러 옵션을 받아서 유저가 선택한 옵션의 카드의 id만 가져옴
 * @param param0 \
 * @returns
 */
const getCardListAction = async ({
  userId,
  filterValidFrom = false,
}: GetCardListActionProps) => {
  const { data: UserCards } = await supabase
    .from("UserCards")
    .select("card_id")
    .eq("user_id", userId);
  const cardList = UserCards?.map((elem) => elem.card_id);

  const { data: Cards, error } = await supabase
    .from("Card")
    .select("id")
    .in("id", cardList ?? [])
    .lt("valid_from", new Date().toISOString());

  if (error) {
    throw new Error("ERROR: getCardListAction failed");
  }

  return Cards;
};

export default getCardListAction;
