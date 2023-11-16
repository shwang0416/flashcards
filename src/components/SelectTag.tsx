import { ForwardedRef, forwardRef } from "react";
import { SELECTED_TAG_COLORS, INITIAL_TAG_COLOR, TagColor } from "./config";

type SelectTagProps = {
  textContent: string;
  isSelected?: boolean;
  color?: TagColor;
  toggleIsSelected: (tag: string) => void;
};

const SelectTag = (
  {
    textContent,
    color = "default",
    isSelected = false,
    toggleIsSelected,
  }: SelectTagProps,
  ref?: ForwardedRef<HTMLButtonElement>,
) => {
  return (
    <>
      <button
        ref={ref}
        onClick={() => toggleIsSelected(textContent)}
        className={`flex h-fit w-fit cursor-pointer flex-row gap-x-1 break-keep rounded-lg border border-slate-300 px-2 py-1 text-sm font-medium  ${
          isSelected ? SELECTED_TAG_COLORS[color] : INITIAL_TAG_COLOR
        }`}
      >
        {textContent}
      </button>
    </>
  );
};

export default forwardRef(SelectTag);
