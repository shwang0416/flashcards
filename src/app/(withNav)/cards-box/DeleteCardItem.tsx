"use client";

import { CheckIcon } from "@heroicons/react/20/solid";
import StarRating from "./StarRating";

type CardItemProps = {
  id: string;
  title: string;
  date: Date;
  difficultyLvl: number;
};

const DeleteCardItem = ({ id, title, date, difficultyLvl }: CardItemProps) => (
    <div className="rounded-xl relative bg-white h-60 ">
      <input
        type="checkbox"
        id={`checkbox_${id}`}
        name={`checkbox_${id}`}
        className="absolute top-4 right-4 appearance-none w-6 h-6 bg-gray-100 border-2 border-transparent hover:border-pink-200 rounded-md peer checked:bg-pink-100"
      />
      <label
        htmlFor={`checkbox_${id}`}
        className="absolute top-4 right-4 peer-checked:[&>svg]:text-pink-500 peer-checked:[&>svg]:stroke-pink-500"
      >
        <CheckIcon className="w-4 h-4 absolute top-1 right-1 text-transparent stroke-2" />
      </label>
      <label
        className="flex flex-col h-full justify-between border-2 rounded-xl border-transparent peer-checked:border-pink-300 items-center p-6 cursor-pointer shadow-md shadow-transparent hover:shadow-pink-200"
        htmlFor={`checkbox_${id}`}
      >
        <div className="text-[24px] break-keep text-left line-clamp-2 w-full">
          {title}
        </div>
        <div className="flex flex-row justify-between w-full items-end">
          <div className="text-sm text-slate-600">
            {new Intl.DateTimeFormat("ko-KR").format(date)}
          </div>
          <StarRating rating={difficultyLvl} />
        </div>
      </label>
    </div>
  );

export default DeleteCardItem;
