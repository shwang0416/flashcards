import {
  PlayIcon,
  ArrowRightOnRectangleIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import LogoutForm from "@/components/auth/LogoutForm";
import { Suspense } from "react";
import LoadingSpinner from "@/components/loading/LoadingSpinner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between bg-slate-600 p-2 rounded-xl ">
        <Link
          href="/play-cards"
          className="text-white hover:bg-pink-300 p-2 rounded-lg"
        >
          <span className="mr-1 inline">Play Cards</span>
          <PlayIcon className="h-6 w-6 text-white inline" />
        </Link>
        <Link
          href="/cards-box"
          className="text-white hover:bg-pink-300 p-2 rounded-lg"
        >
          <span className="mr-1 inline">Cards Box</span>
          <ArchiveBoxIcon className="h-6 w-6 text-white inline" />
        </Link>
        <Link
          href="/"
          className="flex gap-x-1 text-white hover:bg-pink-300 p-2 rounded-lg flex-row items-center"
        >
          <LogoutForm />
          <ArrowRightOnRectangleIcon className="h-6 w-6 text-white inline" />
        </Link>
      </div>

      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </div>
  );
}
