"use client";

import { useRouter } from "next/navigation";

const useNextCard = () => {
  const router = useRouter();
  const cardId = window.localStorage.getItem("currentCardId");
  const string = window.localStorage.getItem("cardLinkedList");

  const parsedData = JSON.parse(string ?? "");

  if (!cardId || !parsedData) throw new Error("!cardId || !parsedData");

  const { next } = parsedData[cardId];

  const goNext = () => {
    window.localStorage.setItem("currentCardId", next);
    router.push(next);
  };

  return { goNext };
};

export default useNextCard;
