"use client";

import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";

const NewCardItem = () => {
  return (
    <>
      <Link
        href={{
          query: { id: "create-new-card" },
        }}
        className="rounded-xl bg-white w-60 h-60 flex flex-col justify-center items-center p-6 cursor-pointer hover:bg-white hover:shadow-xl hover:shadow-gray-300"
      >
        <PlusIcon className="w-8 h-8 text-gray-600 stroke-3" />
      </Link>
    </>
  );
};

export default NewCardItem;
