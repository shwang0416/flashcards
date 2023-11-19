"use client";

import { FormEvent, useState } from "react";
import deleteCardsAction from "@/adaptor/serverActions/deleteCardsAction";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";
import NewCardItem from "./NewCardItem";
import DeleteCardItem from "./DeleteCardItem";
import { Card } from "@/entity/Card";

type DeleteCardsBoxProps = {
  cards: Card[];
};

const DeleteCardsBox = ({ cards }: DeleteCardsBoxProps) => {
  const router = useRouter();

  const [isCardSelected, setIsCardSelected] = useState(false);

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
    <form
      action={onDeleteHandler}
      onChange={handleChange}
      className="flex h-full flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <NewCardItem disabled />
        {cards.map((card: Card) => (
          <DeleteCardItem
            title={card.question_title}
            date={new Date(card.created_at)}
            difficultyLvl={card.difficulty}
            id={card.id}
            key={card.id}
          />
        ))}
      </div>
      <div className="flex flex-grow items-end">
        <SubmitButton
          active={{ buttonText: "삭제하기" }}
          inactive={{ buttonText: "삭제 중..." }}
          disabled={!isCardSelected}
        />
      </div>
    </form>
  );
};

export default DeleteCardsBox;
