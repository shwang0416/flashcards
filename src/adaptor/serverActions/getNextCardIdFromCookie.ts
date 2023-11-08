"use server";

import { cookies } from "next/headers";

const getNextCardIdFromCookie = (currentCardId: string) => {
  const listCookie = cookies().get("card-list");

  const listString = listCookie?.value;

  if (!listString) {
    throw new Error("쿠키에 카드 리스트 정보가 없음");
  }
  const cardLinkedList = JSON.parse(listString);
  const nextCardId = cardLinkedList[currentCardId]?.next;

  return nextCardId;
};

export default getNextCardIdFromCookie;
