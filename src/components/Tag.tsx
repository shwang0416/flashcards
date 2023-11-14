// FIXME: color static하게 적용되도록 변경

import { XMarkIcon } from "@heroicons/react/20/solid";

type TagProps = {
  textContent: string;
  color: string;
  deleteable?: boolean;
  onDelete?: () => void;
};
const Tag = ({
  textContent,
  color,
  deleteable = false,
  onDelete,
}: TagProps) => (
    <div
      className={`rounded-full flex flex-row py-1 px-2 border gap-x-1 border-slate-500 break-keep w-fit h-fit text-sm ${
        deleteable ?? " pl-2 pr-1 "
      }`}
    >
      {textContent}
      {deleteable && (
        <button
          className="p-0 bg-transparent hover:bg-transparent"
          onClick={onDelete}
        >
          <XMarkIcon className="inline w-4 h-4 text-gray-600 hover:bg-pink-200 hover:text-white rounded cursor-pointer" />
        </button>
      )}
    </div>
  );

export default Tag;
