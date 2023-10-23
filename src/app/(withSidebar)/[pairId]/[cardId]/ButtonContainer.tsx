"use client";

import { useRouter } from "next/navigation";

const ButtonContainer = () => {
  const router = useRouter();
  const cardId = window.localStorage.getItem("currentCardId");

  const string = window.localStorage.getItem("cardLinkedList");

  const parsedData = JSON.parse(string ?? "");

  if (!cardId || !parsedData) throw new Error("!cardId || !parsedData");

  const { next, prev } = parsedData[cardId];

  const goNext = (event: any) => {
    event.preventDefault();

    window.localStorage.setItem("currentCardId", next);
    router.push(next);
  };
  const goPrev = (event: any) => {
    event.preventDefault();

    window.localStorage.setItem("currentCardId", prev);
    router.push(prev);
  };
  return (
    <>
      <button
        onClick={goPrev}
        className=" bg-slate-600 text-white hover:bg-pink-300 hover:text-slate-800 py-6 rounded-2xl text-2xl"
      >
        prev
      </button>
      <button
        onClick={goNext}
        className=" bg-slate-600 text-white hover:bg-pink-300 hover:text-slate-800 py-6 rounded-2xl text-2xl"
      >
        next
      </button>
    </>
  );
};

export default ButtonContainer;
