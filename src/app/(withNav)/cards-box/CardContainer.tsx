"use client";

import { ReactNode } from "react";
import CardsBoxHeader from "./CardsBoxHeader";
import DeleteCardsBox from "./DeleteCardsBox";
import ManageCardsBox from "./ManageCardsBox";
import { Card } from "@/entity/Card";

type CardContainerProps = {
  cards: Card[];
  deleteMode: boolean;
  children: ReactNode;
  noValidCards: boolean;
};

const CardContainer = ({
  cards,
  deleteMode,
  children,
  noValidCards,
}: CardContainerProps) => {
  return (
    <>
      <CardsBoxHeader status={deleteMode ? "delete" : "manage"} />
      {children}
      <div className="flex h-full flex-col">
        {deleteMode ? (
          <DeleteCardsBox cards={cards} />
        ) : (
          <ManageCardsBox cards={cards} noValidCards={noValidCards} />
        )}
      </div>
    </>
  );
};

export default CardContainer;
