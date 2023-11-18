"use client";

import { TagStatus } from "@/entity/Tag";
import { Dispatch, SetStateAction, useMemo } from "react";
import { setAllTagStatus } from "@/entity/util/Tag";
import MultiselectTags from "./MultiselectTags";

type MultiSelectTagsControllerProps = {
  tags: string[];
  tagStatus: TagStatus;
  updateTagStatus: Dispatch<SetStateAction<TagStatus>>;
};

const MultiSelectTagsController = ({
  tags,
  tagStatus,
  updateTagStatus,
}: MultiSelectTagsControllerProps) => {
  const isAllTagSelected = useMemo(
    () => !Object.values(tagStatus).some((val) => !val),
    [tagStatus],
  );

  const toggleIsSelected = (tag: string) => {
    updateTagStatus((tagStatus) => ({ ...tagStatus, [tag]: !tagStatus[tag] }));
  };

  const toggleSelectAll = () => {
    // 하나라도 선택안된게있으면 전체 true
    if (isAllTagSelected) updateTagStatus(setAllTagStatus(tags, false));
    // 모두 선택되어있다면 전체 false
    else updateTagStatus(setAllTagStatus(tags, true));
  };

  return (
    <MultiselectTags
      tags={tags}
      tagStatus={tagStatus}
      isAllTagSelected={isAllTagSelected}
      toggleSelectAll={toggleSelectAll}
      toggleIsSelected={toggleIsSelected}
    />
  );
};

export default MultiSelectTagsController;
