"use client";

import { useMemo, useState } from "react";
import getCardListByTags from "@/adaptor/serverActions/getCardListByTags";
import { useRouter } from "next/navigation";
import { TagStatus } from "@/data/Tag";
import SelectTag from "./SelectTag";

type MultiselectTagsProps = {
  tags: string[];
};

const setAllTagStatus = (tags: string[], status: boolean): TagStatus =>
  tags.reduce((acc: TagStatus, tag: string) => {
    acc[tag] = status;
    return acc;
  }, {});

const MultiselectTags = ({ tags }: MultiselectTagsProps) => {
  const router = useRouter();
  const [tagStatus, setTagStatus] = useState<TagStatus>(
    setAllTagStatus(tags, false),
  );

  const isAllTagSelected = useMemo(
    () => !Object.values(tagStatus).some((val) => !val),
    [tagStatus],
  );

  const toggleIsSelected = (tag: string) => {
    setTagStatus((tagStatus) => ({ ...tagStatus, [tag]: !tagStatus[tag] }));
  };

  const toggleSelectAll = () => {
    // 하나라도 선택안된게있으면 전체 true
    if (isAllTagSelected) setTagStatus(setAllTagStatus(tags, false));
    // 모두 선택되어있다면 전체 false
    else setTagStatus(setAllTagStatus(tags, true));
  };

  const onClickHandler = async () => {
    const firstCardId = await getCardListByTags(tagStatus);
    router.push(`/play-cards/card/${firstCardId}`);
  };

  return (
    <div className="flex flex-col items-start gap-y-10">
      <h4 className="text-xl font-semibold">키워드로 검색하기</h4>
      <div className="flex w-full flex-row flex-wrap gap-1">
        <SelectTag
          textContent="전체보기"
          isSelected={isAllTagSelected}
          toggleIsSelected={toggleSelectAll}
        />
        {tags &&
          tags.map((tag) => (
            <SelectTag
              textContent={tag}
              isSelected={tagStatus[tag]}
              toggleIsSelected={toggleIsSelected}
            />
          ))}
        {/* {tags.length === 0 && (
          <div className="">Cards-box에서 키워드를 추가해보세요</div>
        )} */}
      </div>
      <button type="button" className="button-default" onClick={onClickHandler}>
        시작하기!
      </button>
    </div>
  );
};

export default MultiselectTags;
