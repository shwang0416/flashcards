"use client";

import { Card } from "@/entity/Card";
import NewCardItem from "./NewCardItem";
import LinkCardItem from "./LinkCardItem";
import InfoCardItem from "./InfoCardItem";

type ManageCardsBoxProps = {
  cards: Card[];
  noValidCards: boolean;
};

const ManageCardsBox = ({ cards, noValidCards }: ManageCardsBoxProps) => (
  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    <NewCardItem />
    {cards.length === 0 ? (
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
    ) : (
      cards.map((card: Card) => (
        <LinkCardItem
          title={card.question_title}
          date={new Date(card.created_at)}
          difficultyLvl={card.difficulty}
          id={card.id}
          key={card.id}
        />
      ))
    )}
  </div>
);

export default ManageCardsBox;
