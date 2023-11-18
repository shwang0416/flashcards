import getCardIdListByTags from "../getCardIdListByTags";
import getCardIdListByAllTags from "../getCardIdListByAllTags";
import getUserCards from "../getUserCards";
import getUserAction from "./auth/getUserAction";

type GetCardIdListActionProps = {
  tags?: string[];
  filterValidFrom?: boolean;
};

/**
 * 여러 옵션을 받아서 유저가 선택한 옵션의 카드의 id만 가져옴
 * @param param0 \
 * @returns
 */
const getCardIdListAction = async ({
  tags, // filterValidFrom = false,
}: GetCardIdListActionProps) => {
  const user = await getUserAction();
  if (!user) throw new Error("ERROR: no user");

  const cardList = await getUserCards(user.id);

  if (tags && tags.length > 0) {
    return getCardIdListByTags(cardList, tags);
  }
  return getCardIdListByAllTags(cardList);
};

export default getCardIdListAction;
