// FIXME: color static하게 적용되도록 변경

import { XMarkIcon } from "@heroicons/react/20/solid";

type Color = "pink" | "yellow" | "green" | "lime";
type TagProps = {
  textContent: string;
  color?: Color;
  deleteable?: boolean;
  onDelete?: () => void;
};

const colorMapper = {
  pink: "text-pink-500 bg-pink-100",
  yellow: "text-yellow-500 bg-yellow-100",
  green: "text-green-500 bg-green-100",
  lime: "text-lime-500 bg-lime-100",
  default: "text-gray-500 bg-gray-100",
};
const Tag = ({
  textContent,
  color,
  deleteable = false,
  onDelete,
}: TagProps) => (
  <div
    className={`flex h-fit w-fit flex-row gap-x-1 break-keep rounded-full border border-slate-300 px-2 py-1 text-sm ${
      deleteable ?? " pl-2 pr-1 "
    } ${colorMapper[color ?? "pink"]}`}
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
