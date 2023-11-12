"use client";

import CardItemSkeleton from "@/components/loading/CardItemSkeleton";
import { FormEvent, Suspense, useState } from "react";
import DeleteCardItem from "./DeleteCardItem";
import LinkCardItem from "./LinkCardItem";
import NewCardItem from "./NewCardItem";
import deleteCardsAction from "@/adaptor/serverActions/deleteCardsAction";
import { useRouter } from "next/navigation";
import {
  ArchiveBoxIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

type Card = {
  question_title: string;
  created_at: string | number | Date;
  difficulty: number;
  id: string;
};

type CardContainerProps = {
  cards: Card[];
  deleteMode: boolean;
};

const data = {
  manage: {
    title: "Cards Box",
    description: "모아둔 카드를 확인하세요",
    changeModeText: "카드 삭제",
  },
  delete: {
    title: "Delete Card",
    description: "삭제할 카드를 선택하세요",
    changeModeText: "카드 관리",
  },
};
const CardContainer = ({ cards, deleteMode }: CardContainerProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCardSelected, setIsCardSelected] = useState(false);
  const { title, description, changeModeText } =
    data[deleteMode ? "delete" : "manage"];

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (!form) return;
    const formData = new FormData(form);
    const isEmpty = formData.entries().next().done;

    setIsCardSelected(!isEmpty);
  };

  const onDeleteHandler = async (formData: FormData) => {
    const checkedCardIs = Array.from(formData.entries()).map((pair) => {
      const key = pair[0];
      const value = pair[1];
      if (value === "on" && key.startsWith("checkbox")) {
        return key.replace("checkbox_", "");
      }
    });

    if (!checkedCardIs || checkedCardIs.length === 0) {
      alert("삭제할 카드를 선택해주세요");
      return;
    }
    if (!confirm("정말로 삭제하시겠어요? 삭제한 카드는 다시 이용할 수 없어요."))
      return;

    await deleteCardsAction(checkedCardIs as string[]);

    alert("카드 삭제가 완료되었습니다.");
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-row justify-between rounded-xl bg-white w-full h-60">
        <div className=" flex flex-col justify-end p-6">
          <h2 className="text-[60px] font-semibold mb-6">{title}</h2>
          <p className="text-xl ml-2">{description}</p>
        </div>

        <div className="flex flex-col items-end m-4 relative">
          <button
            className="m-1 p-1 absolute cursor-pointer w-fit bg-transparent hover:bg-gray-200 rounded-xl"
            onClick={() => setIsMenuOpen((val) => !val)}
          >
            <EllipsisHorizontalIcon className="w-8 h-8 text-gray-600 stroke-3" />
          </button>
          {isMenuOpen && (
            <div className="rounded-xl bg-gray-100 w-32 h-fit flex flex-col items-center p-1">
              <div className="mt-12"></div>
              {deleteMode ? (
                <Link
                  href={{
                    pathname: "/cards-box",
                  }}
                  className="hover:bg-gray-200 border border-transparent group hover:border-gray-300 text-center w-full rounded-lg flex gap-x-2 items-center justify-center"
                >
                  <span className="mt-1 group-hover:text-pink-500">
                    {changeModeText}
                  </span>
                  <ArchiveBoxIcon className="h-6 w-6 text-slate-500 group-hover:text-pink-500" />
                </Link>
              ) : (
                <Link
                  href={{
                    query: { d: true },
                  }}
                  className="hover:bg-gray-200 border border-transparent group hover:border-gray-300 text-center w-full rounded-lg flex gap-x-2 items-center justify-center"
                >
                  <span className="mt-1 group-hover:text-pink-500">
                    {changeModeText}
                  </span>
                  <TrashIcon className="w-6 h-6 text-slate-500 group-hover:text-pink-500" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col h-full">
        {deleteMode ? (
          <form
            action={onDeleteHandler}
            onChange={handleChange}
            className="flex flex-col gap-4 h-full"
          >
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              <NewCardItem disabled={true} />
              <Suspense fallback={<CardItemSkeleton />}>
                {cards.map((card: Card) => (
                  <DeleteCardItem
                    title={card.question_title}
                    date={new Date(card.created_at)}
                    difficultyLvl={card.difficulty}
                    id={card.id}
                    key={card.id}
                  />
                ))}
              </Suspense>
            </div>
            <div className="flex items-end flex-grow">
              <button
                type="submit"
                disabled={!isCardSelected}
                className={`w-full font-semibold text-[24px] text-center disabled:bg-slate-300 bg-pink-300 px-6 py-3 rounded-xl hover:bg-pink-400 cursor-pointer text-white`}
              >
                삭제하기
              </button>
            </div>
          </form>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <NewCardItem disabled={false} />
            <Suspense fallback={<CardItemSkeleton />}>
              {cards.map((card: Card) => (
                <LinkCardItem
                  title={card.question_title}
                  date={new Date(card.created_at)}
                  difficultyLvl={card.difficulty}
                  id={card.id}
                  key={card.id}
                />
              ))}
            </Suspense>
          </div>
        )}
      </div>
    </>
  );
};

export default CardContainer;
