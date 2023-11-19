"use client";

import Tag from "@/components/Tag";
import { KeyboardEvent, FocusEvent, useMemo, useRef } from "react";

type TagFormProps = {
  localTags: string[];
  updateLocalTags: (tagList: string[]) => void;
};

const TagForm = ({ localTags, updateLocalTags }: TagFormProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const hasLocalTags = useMemo(
    () => localTags && localTags.length > 0,
    [localTags],
  );
  const onDelete = (tag: string) => {
    updateLocalTags(localTags.filter((localTag) => localTag !== tag));
  };

  const handleOnBlur = (event: FocusEvent) => {
    event.preventDefault();
    // (event.target as HTMLTextAreaElement).value = "";
    (ref.current as HTMLTextAreaElement).value = "";
  };

  const handleOnKeyUp = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter") return;

    const target = event.target as HTMLTextAreaElement;
    const newTag = target.value;

    const trimedTag = newTag.trim();
    if (trimedTag === "") return;
    if (hasLocalTags) updateLocalTags([...localTags, trimedTag]);
    else updateLocalTags([trimedTag]);
    target.value = "";
  };

  return (
    <div className="flex h-10 min-h-fit w-full flex-row items-center gap-x-1 rounded-xl bg-gray-50 p-2">
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
        className="ml-2 mt-1 h-6 w-full resize-none self-end overflow-hidden bg-transparent align-bottom leading-loose outline-none"
        onKeyUp={handleOnKeyUp}
        onBlur={handleOnBlur}
        ref={ref}
      />
    </div>
  );
};

export default TagForm;
