"use server";

import getLinkedList from "@/util/getLinkedList";
import { cookies } from "next/headers";
import { TagStatus } from "@/entity/Tag";
import getCardIdListAction from "./getCardIdListAction";

const getCardListByTags = async (remoteTagStatus: TagStatus) => {
  const selectedTags = Object.keys(remoteTagStatus).filter((tag) => {
    if (remoteTagStatus[tag]) {
      return tag;
    }
    return null;
  });

  const cards = await getCardIdListAction({
    tags: selectedTags,
  });
  const cardIds = cards.map((elem) => elem.id);
  const cardLinkedList = getLinkedList(cardIds);
  // 링크드리스트를 쿠키에 보관
  cookies().set("card-list", JSON.stringify(cardLinkedList));

  // FIXME: 시작하는 카드도 랜덤으로 바꾸기
  //   cookies().set("first-card-id", cardIds[0]);
  return cardIds[0];
};

export default getCardListByTags;
