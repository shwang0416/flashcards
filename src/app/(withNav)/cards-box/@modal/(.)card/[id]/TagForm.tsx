"use client";

import Tag from "@/components/Tag";
import { KeyboardEvent, FocusEvent, useMemo } from "react";

type TagFormProps = {
  localTags: string[];
  updateLocalTags: (tagList: string[]) => void;
};

const TagForm = ({ localTags, updateLocalTags }: TagFormProps) => {
  const hasLocalTags = useMemo(
    () => localTags && localTags.length > 0,
    [localTags],
  );
  const onDelete = (tag: string) => {
    updateLocalTags(localTags.filter((localTag) => localTag !== tag));
  };

  const handleOnBlur = (event: FocusEvent) => {
    event.preventDefault();
    (event.target as HTMLTextAreaElement).value = "";
  };

  const handleOnKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter") return;

    const target = event.target as HTMLTextAreaElement;
    const newTag = target.value;
    const blank_pattern = /^\s+|\s+$/g;
    if (newTag.replace(blank_pattern, "") == "") return;

    if (hasLocalTags) updateLocalTags([...localTags, newTag]);
    else updateLocalTags([newTag]);
    target.value = "";
  };

  return (
    <div className="flex flex-row w-full p-2 gap-x-1 items-center bg-gray-50 rounded-xl h-10 min-h-fit">
      {hasLocalTags &&
        localTags.map((tag) => (
          <Tag
            textContent={tag}
            key={`key_${tag}`}
            color="pink"
            deleteable
            onDelete={() => onDelete(tag)}
          />
        ))}

      <textarea
        placeholder={
          hasLocalTags ? "" : "문제와 연관된 키워드를 입력해보세요 (생략 가능)"
        }
        className="ml-2 mt-1 w-full h-6 self-end resize-none leading-loose align-bottom outline-none overflow-hidden bg-transparent"
        onKeyUp={handleOnKeyUp}
        onBlur={handleOnBlur}
      />
    </div>
  );
};

export default TagForm;
