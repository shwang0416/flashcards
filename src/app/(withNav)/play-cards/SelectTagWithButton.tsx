"use client";

import getCardListByTags from "@/adaptor/serverActions/getCardListByTags";
import MultiSelectTagsController from "@/components/MultiSelectTagsController";
import { TagStatus } from "@/entity/Tag";
import { setAllTagStatus } from "@/entity/util/Tag";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type SelectTagWithButtonProps = {
  tags: string[];
  buttonText: string;
};

const checkIfAnyTrue = (obj: Object) => Object.values(obj).includes(true);

const SelectTagWithButton = ({
  tags,
  buttonText,
}: SelectTagWithButtonProps) => {
  const router = useRouter();
  const [tagStatus, setTagStatus] = useState<TagStatus>(
    setAllTagStatus(tags, true),
  );

  const disabled = useMemo(() => !checkIfAnyTrue(tagStatus), [tagStatus]);
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
        disabled={disabled}
        className="button-default"
        onClick={() => onClickHandler(tagStatus)}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SelectTagWithButton;
