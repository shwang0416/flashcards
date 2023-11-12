"use client";

import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

const NewCardItem = ({ disabled }: { disabled?: boolean }) => {
  return (
    <>
      <Link
        // href={{
        //   query: { id: "create-new-card" },
        // }}
        href={`/cards-box/card/create-new-card`}
        className={`rounded-xl ${
          disabled
            ? "bg-gray-100"
            : "bg-white hover:bg-white hover:shadow-xl cursor-pointer"
        } h-60 flex flex-col justify-center items-center p-6  hover:shadow-gray-300`}
      >
        <PlusIcon
          className={`w-8 h-8  stroke-3 ${
            disabled ? "text-gray-200" : "text-gray-600"
          }`}
        />
      </Link>
    </>
  );
};

export default NewCardItem;
