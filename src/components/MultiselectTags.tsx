"use client";

import { TagStatus } from "@/entity/Tag";
import SelectTag from "./SelectTag";

type MultiselectTagsProps = {
  tags: string[];
  tagStatus: TagStatus;
  isAllTagSelected: boolean;
  toggleSelectAll: () => void;
  toggleIsSelected: (tag: string) => void;
};

const MultiselectTags = ({
  tags,
  tagStatus,
  isAllTagSelected,
  toggleSelectAll,
  toggleIsSelected,
}: MultiselectTagsProps) => (
  <>
    <h4 className="pb-8 text-xl font-semibold">키워드로 검색하기</h4>
    <div className="flex w-full flex-row flex-wrap gap-1">
      <SelectTag
        textContent="모두 선택"
        isSelected={isAllTagSelected}
        toggleIsSelected={toggleSelectAll}
      />
      {tags &&
        tags.map((tag) => (
          <SelectTag
            key={tag}
            textContent={tag}
            isSelected={tagStatus[tag]}
            toggleIsSelected={toggleIsSelected}
          />
        ))}
    </div>
  </>
);

export default MultiselectTags;
