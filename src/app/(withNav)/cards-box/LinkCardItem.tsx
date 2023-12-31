"use client";

import Link from "next/link";
import StarRating from "./StarRating";

type CardItemProps = {
  id: string;
  title: string;
  date: Date;
  difficultyLvl: number;
};
const LinkCardItem = ({ id, title, date, difficultyLvl }: CardItemProps) => (
  <Link
    href={`/cards-box/card/${id}`}
    className="rounded-xl bg-white h-60 flex flex-col justify-between items-center p-6 cursor-pointer  hover:shadow-xl hover:shadow-gray-300"
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
  </Link>
);

export default LinkCardItem;
