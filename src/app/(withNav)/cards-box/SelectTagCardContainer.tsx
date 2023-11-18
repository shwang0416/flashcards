"use client";

import { useMemo, useState } from "react";
import MultiSelectTagsController from "@/components/MultiSelectTagsController";
import { TagStatus } from "@/entity/Tag";
import { Card } from "@/entity/Card";
import {
  cardsToTags,
  filterCardsByTags,
  setAllTagStatus,
  tagStatusToTags,
} from "@/entity/util/Tag";
import CardContainer from "./CardContainer";

type SelectTagCardContainerProps = {
  cards: Card[];
  deleteMode: boolean;
};

const SelectTagCardContainer = ({
  cards,
  deleteMode,
}: SelectTagCardContainerProps) => {
  const [remoteTags] = useState(cardsToTags(cards));
  const [tagStatus, setTagStatus] = useState<TagStatus>(
    setAllTagStatus(remoteTags, false),
  );
  //   tagStatus로 카드를 필터링해서 넘긴다
  const filteredCards = useMemo(() => {
    const selectedTags = tagStatusToTags(tagStatus);

    if (selectedTags.length > 0) return filterCardsByTags(cards, selectedTags);
    return cards;
  }, [cards, tagStatus]);

  return (
    <div className="flex h-full flex-col gap-4 pt-4">
      <MultiSelectTagsController
        tags={remoteTags}
        tagStatus={tagStatus}
        updateTagStatus={setTagStatus}
      />
      <CardContainer cards={filteredCards} deleteMode={deleteMode} />
    </div>
  );
};

export default SelectTagCardContainer;
