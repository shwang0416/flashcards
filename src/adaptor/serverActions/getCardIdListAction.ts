import supabase from "@/lib/supabase/supabase-service-role-client";
import getCardIdListByTags from "../getCardIdListByTags";
import getCardIdListByAllTags from "../getCardIdListByAllTags";

type GetCardIdListActionProps = {
  userId: string;
  tags?: string[];
  filterValidFrom?: boolean;
};

/**
 * 여러 옵션을 받아서 유저가 선택한 옵션의 카드의 id만 가져옴
 * @param param0 \
 * @returns
 */
const getCardIdListAction = async ({
  userId,
  tags, // filterValidFrom = false,
}: GetCardIdListActionProps) => {
  const { data: UserCards, error } = await supabase
    .from("UserCards")
    .select("card_id")
    .eq("user_id", userId);

  if (error) throw new Error("ERROR: getCardIdListAction failed");

  const cardList = UserCards?.map((elem) => elem.card_id);

  if (tags && tags.length > 0) {
    return await getCardIdListByTags(cardList, tags);
  }
  return await getCardIdListByAllTags(cardList);
};

export default getCardIdListAction;
