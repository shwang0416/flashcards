"use client";

import { useEffect, useMemo, useState } from "react";
import MultiSelectTagsController from "@/components/MultiSelectTagsController";
import { TagStatus } from "@/entity/Tag";
import { Card } from "@/entity/Card";
import {
  filterCardsByTags,
  setAllTagStatus,
  tagStatusToTags,
} from "@/entity/util/Tag";
import CardsBoxController from "./CardContainer";

type SelectTagCardContainerProps = {
  cards: Card[];
  remoteTags: string[];
  deleteMode: boolean;
};

const SelectTagCardContainer = ({
  cards,
  remoteTags,
  deleteMode,
}: SelectTagCardContainerProps) => {
  const [tagStatus, setTagStatus] = useState<TagStatus>(
    setAllTagStatus(remoteTags, true),
  );

  useEffect(() => {
    const newTag = remoteTags.filter(
      (x) => !Object.keys(tagStatus).includes(x),
    );
    if (newTag.length === 0) return;
    const newTagStatus = newTag.reduce((acc, tag) => {
      acc[tag] = true;
      return acc;
    }, {} as TagStatus);
    setTagStatus((prev) => ({ ...prev, ...newTagStatus }));
  }, [remoteTags]);

  const filteredCards = useMemo(() => {
    // const noTags
    if (remoteTags.length === 0 && cards.length > 0) {
      return cards;
    }

    const selectedTags = tagStatusToTags(tagStatus);

    return filterCardsByTags(cards, selectedTags);
  }, [cards, tagStatus]);

  // tagStatus => 태그 X, 카드 x : {} cards.length === 0  / 태그 X, 카드 o : {} cards.length > 0 (=== remoteTags?)
  // 들고온카드중에하나라도 태그가있으면 오류 없나?
  //               태그 o, 카드 o, 선택 x : {[태그이름]: false ... } / 태그 o, 카드 o, 선택 o {[태그이름]: true ... }
  // 걍 무조건 태그를 넣게 하자

  const [noValidCards] = useState(!cards || cards.length === 0);
  // const [noFilteredCards] = useState(
  //   !filteredCards || filteredCards.length === 0,
  // );

  return (
    <CardsBoxController
      cards={filteredCards}
      noValidCards={noValidCards}
      deleteMode={deleteMode}
    >
      {!noValidCards && (
        <div className="rounded-xl bg-white p-6 py-6">
          <MultiSelectTagsController
            tags={remoteTags}
            tagStatus={tagStatus}
            updateTagStatus={setTagStatus}
          />
        </div>
      )}
    </CardsBoxController>
  );
};

export default SelectTagCardContainer;
