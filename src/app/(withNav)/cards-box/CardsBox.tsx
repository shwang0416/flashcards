"use client";

import CardItemSkeleton from "@/components/loading/CardItemSkeleton";
import { FormEvent, ReactNode, Suspense, useState } from "react";
import deleteCardsAction from "@/adaptor/serverActions/deleteCardsAction";
import { useRouter } from "next/navigation";
import {
  ArchiveBoxIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";
import NewCardItem from "./NewCardItem";
import LinkCardItem from "./LinkCardItem";
import DeleteCardItem from "./DeleteCardItem";
import InfoCardItem from "./InfoCardItem";

type Card = {
  question_title: string;
  tags: string[];
  created_at: string | number | Date;
  difficulty: number;
  id: string;
};

type CardContainerProps = {
  cards: Card[];
  deleteMode: boolean;
  children: ReactNode;
  noValidCards: boolean;
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
const CardContainer = ({
  cards,
  deleteMode,
  children,
  noValidCards,
}: CardContainerProps) => {
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
    const checkedCardIds = Array.from(formData.entries()).map((pair) => {
      const key = pair[0];
      const value = pair[1];
      if (value === "on" && key.startsWith("checkbox")) {
        return key.replace("checkbox_", "");
      }
      return null;
    });

    if (!checkedCardIds || checkedCardIds.length === 0) {
      alert("삭제할 카드를 선택해주세요");
      return;
    }
    if (
      !window.confirm(
        "정말로 삭제하시겠어요? 삭제한 카드는 다시 이용할 수 없어요.",
      )
    )
      return;

    await deleteCardsAction(checkedCardIds as string[]);

    alert("카드 삭제가 완료되었습니다.");
    router.refresh();
  };

  return (
    <>
      <div className="flex h-60 w-full flex-row justify-between rounded-xl bg-white">
        <div className=" flex flex-col justify-end p-6">
          <h2 className="mb-6 text-[60px] font-semibold">{title}</h2>
          <p className="ml-2 text-xl">{description}</p>
        </div>

        <div className="relative m-4 flex flex-col items-end">
          <button
            type="button"
            className="absolute m-1 w-fit cursor-pointer rounded-xl bg-transparent p-1 hover:bg-gray-200"
            onClick={() => setIsMenuOpen((val) => !val)}
          >
            <EllipsisHorizontalIcon className="stroke-3 h-8 w-8 text-gray-600" />
          </button>
          {isMenuOpen && (
            <div className="flex h-fit w-32 flex-col items-center rounded-xl bg-gray-100 p-1">
              <div className="mt-12" />
              {deleteMode ? (
                <Link
                  href={{
                    pathname: "/cards-box",
                  }}
                  className="group flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent text-center hover:border-gray-300 hover:bg-gray-200"
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
                  className="group flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent text-center hover:border-gray-300 hover:bg-gray-200"
                >
                  <span className="mt-1 group-hover:text-pink-500">
                    {changeModeText}
                  </span>
                  <TrashIcon className="h-6 w-6 text-slate-500 group-hover:text-pink-500" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      {children}
      <div className="flex h-full flex-col">
        {deleteMode ? (
          <form
            action={onDeleteHandler}
            onChange={handleChange}
            className="flex h-full flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              <NewCardItem disabled />
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
            <div className="flex flex-grow items-end">
              <SubmitButton
                active={{ buttonText: "삭제하기" }}
                inactive={{ buttonText: "삭제 중..." }}
                disabled={!isCardSelected}
              />
            </div>
          </form>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <NewCardItem />
            {cards.length === 0 && (
              <InfoCardItem title="카드가 없습니다">
                {noValidCards ? (
                  <p className="inline-flex items-center text-sm">
                    새로운 카드를 만들어보세요
                  </p>
                ) : (
                  <p className="inline-flex items-center text-sm">
                    상단의{" "}
                    <span className="flex h-fit w-fit flex-row gap-x-1 rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-sm font-medium text-gray-500">
                      키워드
                    </span>{" "}
                    를 선택해보세요
                  </p>
                )}
              </InfoCardItem>
            )}
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
