"use client";

import getAllCards from "@/adaptor/serverActions/getAllCardsAction";
import getLinkedList from "@/util/getLinkedList";
import shuffleArray from "@/util/shuffleArray";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = ({}: {}) => {
  const router = useRouter();
  useEffect(() => {
    //FIXME: 클라이언트 컴포넌트에서 fetch하는 방식 외에 다른 방식이 없을까?
    const asyncFunc = async () => {
      const cards = await getAllCards();

      const cardIds = cards.map((card) => card.id);
      const shuffledCards = shuffleArray(cardIds);
      const cardLinkedList = getLinkedList(shuffledCards);
      const currentCardId = shuffledCards[0];

      if (currentCardId) {
        window.localStorage.setItem(
          "cardLinkedList",
          JSON.stringify(cardLinkedList),
        );
        window.localStorage.setItem("currentCardId", currentCardId);
        router.push(`/${currentCardId}`);
      }
    };
    asyncFunc();
  }, [router]);

  return <></>;
};

export default Page;
