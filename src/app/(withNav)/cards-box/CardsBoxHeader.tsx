import {
  EllipsisHorizontalIcon,
  ArchiveBoxIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

type CardsBoxHeader = {
  status: "delete" | "manage";
};

const data = {
  manage: {
    title: "Cards Box",
    description: "모아둔 카드를 확인하세요",
    changeModeText: "카드 삭제",
  },
  delete: {
    title: "Delete Card",
    description: "삭제할 카드를 선택하세요",
    changeModeText: "카드 관리",
  },
};

const CardsBoxHeader = ({ status }: CardsBoxHeader) => {
  const { title, description, changeModeText } = data[status];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-60 w-full flex-row justify-between rounded-xl bg-white">
      <div className=" flex flex-col justify-end p-6">
        <h2 className="mb-6 text-[60px] font-semibold">{title}</h2>
        <p className="ml-2 text-xl">{description}</p>
      </div>

      <div className="relative m-4 flex flex-col items-end">
        <button
          type="button"
          className="absolute m-1 w-fit cursor-pointer rounded-xl bg-transparent p-1 hover:bg-gray-200"
          onClick={() => setIsMenuOpen((val) => !val)}
        >
          <EllipsisHorizontalIcon className="stroke-3 h-8 w-8 text-gray-600" />
        </button>
        {isMenuOpen && (
          <div className="flex h-fit w-32 flex-col items-center rounded-xl bg-gray-100 p-1">
            <div className="mt-12" />
            {status === "delete" ? (
              <Link
                href={{
                  pathname: "/cards-box",
                }}
                className="group flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent text-center hover:border-gray-300 hover:bg-gray-200"
              >
                <span className="mt-1 group-hover:text-pink-500">
                  {changeModeText}
                </span>
                <ArchiveBoxIcon className="h-6 w-6 text-slate-500 group-hover:text-pink-500" />
              </Link>
            ) : (
              <Link
                href={{
                  query: { d: true },
                }}
                className="group flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent text-center hover:border-gray-300 hover:bg-gray-200"
              >
                <span className="mt-1 group-hover:text-pink-500">
                  {changeModeText}
                </span>
                <TrashIcon className="h-6 w-6 text-slate-500 group-hover:text-pink-500" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsBoxHeader;
