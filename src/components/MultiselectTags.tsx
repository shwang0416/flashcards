"use client";

import { useState } from "react";
import getCardListByTags from "@/adaptor/serverActions/getCardListByTags";
import { useRouter } from "next/navigation";
import { TagStatus } from "@/data/Tag";
import SelectTag from "./SelectTag";

const mockTags = ["React", "NextJs", "JS/TS", "브라우저", "면접준비"];

const MultiselectTags = () => {
  const router = useRouter();
  const [tagStatus, setTagStatus] = useState(
    mockTags.reduce((acc: TagStatus, tag: string) => {
      acc[tag] = false;
      return acc;
    }, {}),
  );

  const toggleIsSelected = (tag: string) => {
    setTagStatus((tagStatus) => ({ ...tagStatus, [tag]: !tagStatus[tag] }));
  };

  const onClickHandler = async () => {
    const firstCardId = await getCardListByTags(tagStatus);
    router.push(`/play-cards/card/${firstCardId}`);
  };

  return (
    <div className="flex flex-col items-start gap-y-10">
      <div className="flex flex-row gap-1">
        {mockTags.map((tag) => (
          <SelectTag
            textContent={tag}
            isSelected={tagStatus[tag]}
            toggleIsSelected={toggleIsSelected}
          />
        ))}
      </div>
      <button type="button" className="button-default" onClick={onClickHandler}>
        시작하기!
      </button>
    </div>
  );
};

export default MultiselectTags;
