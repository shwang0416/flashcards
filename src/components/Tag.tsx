// FIXME: color static하게 적용되도록 변경

import { XMarkIcon } from "@heroicons/react/20/solid";
import { TagColor, TAG_COLORS } from "./config";

type TagProps = {
  textContent: string;
  color?: TagColor;
  deleteable?: boolean;
  onDelete?: () => void;
};

const Tag = ({
  textContent,
  color = "default",
  deleteable = false,
  onDelete,
}: TagProps) => (
  <div
    className={`flex h-fit w-fit flex-row gap-x-1 break-keep rounded-full border border-slate-300 px-2 py-1 text-sm ${
      deleteable ?? " pl-2 pr-1 "
    } ${TAG_COLORS[color]}`}
  >
    {textContent}
    {deleteable && (
      <button
        type="button"
        className="bg-transparent p-0 hover:bg-transparent"
        onClick={onDelete}
      >
        <XMarkIcon className="inline h-4 w-4 cursor-pointer rounded text-gray-600 hover:bg-pink-200 hover:text-white" />
      </button>
    )}
  </div>
);

export default Tag;
