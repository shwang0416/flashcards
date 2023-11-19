"use client";

import { ReactNode } from "react";
import { Card } from "@/entity/Card";
import CardsBoxHeader from "./CardsBoxHeader";
import DeleteCardsBox from "./DeleteCardsBox";
import ManageCardsBox from "./ManageCardsBox";

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
}: CardContainerProps) => (
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

export default CardContainer;
