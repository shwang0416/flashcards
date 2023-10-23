"use client";

import getPairs from "@/adaptor/serverActions/getPairsAction";
import getLinkedList from "@/util/getLinkedList";
import shuffleArray from "@/util/shuffleArray";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

//FIXME: currentCardId말고 시작하는 id만 넣어서 그 다음에는 url에 있는 id만 보게할까
type Storage = {
  [pairId: string]: string;
  currentCardId: string;
};

const Page = ({
  params,
}: {
  params: {
    pairId: string;
  };
}) => {
  const { pairId } = params;
  const router = useRouter();
  useEffect(() => {
    //FIXME: 클라이언트 컴포넌트에서 fetch하는 방식 외에 다른 방식이 없을까?
    const asyncFunc = async () => {
      const pairs = await getPairs();

      const cardIds = pairs.filter((pair) => pair.id === pairId)[0]?.cardIds;
      //FIXME: shuffleArray 구현해야함
      const shuffledCards = shuffleArray(cardIds);

      const cardLinkedList = getLinkedList(shuffledCards);
      const currentCardId = shuffledCards[0];

      window.localStorage.setItem(
        "cardLinkedList",
        JSON.stringify(cardLinkedList),
      );
      window.localStorage.setItem("pairId", pairId);
      window.localStorage.setItem("currentCardId", currentCardId);
      router.push(`/${pairId}/${currentCardId}`);
    };
    asyncFunc();
  }, [pairId, router]);

  return <div className="flex bg-amber-300"></div>;
};

export default Page;
