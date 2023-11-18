"use client";

import getCardListByTags from "@/adaptor/serverActions/getCardListByTags";
import MultiSelectTagsController from "@/components/MultiSelectTagsController";
import { TagStatus } from "@/data/Tag";
import { setAllTagStatus } from "@/entity/util/Tag";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SelectTagWithButtonProps = {
  tags: string[];
  buttonText: string;
};

const SelectTagWithButton = ({
  tags,
  buttonText,
}: SelectTagWithButtonProps) => {
  const router = useRouter();
  const [tagStatus, setTagStatus] = useState<TagStatus>(
    setAllTagStatus(tags, false),
  );

  const onClickHandler = async (tagStatus: TagStatus) => {
    const firstCardId = await getCardListByTags(tagStatus);
    router.push(`/play-cards/card/${firstCardId}`);
  };

  return (
    <div className="flex flex-col items-start gap-y-10">
      <MultiSelectTagsController
        tags={tags}
        tagStatus={tagStatus}
        updateTagStatus={setTagStatus}
      />
      <button
        type="button"
        className="button-default"
        onClick={() => onClickHandler(tagStatus)}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SelectTagWithButton;
