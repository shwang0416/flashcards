import {
  PlayIcon,
  ArrowRightOnRectangleIcon,
  ArchiveBoxIcon,
  CalendarDaysIcon,
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
          href="/daily-check-in"
          className="text-white border border-transparent hover:bg-slate-500 hover:border-slate-400 p-2 rounded-lg"
        >
          <span className="mr-1 inline">Daily Check in</span>
          <CalendarDaysIcon className="h-6 w-6 text-white inline" />
        </Link>
        <Link
          href="/play-cards"
          className="text-white border border-transparent hover:bg-slate-500 hover:border-slate-400 p-2 rounded-lg"
        >
          <span className="mr-1 inline">Play Cards</span>
          <PlayIcon className="h-6 w-6 text-white inline" />
        </Link>
        <Link
          href="/cards-box"
          className="text-white border border-transparent hover:bg-slate-500 hover:border-slate-400 p-2 rounded-lg"
        >
          <span className="mr-1 inline">Cards Box</span>
          <ArchiveBoxIcon className="h-6 w-6 text-white inline" />
        </Link>
        <div className="flex gap-x-1 flex-row text-white border border-transparent hover:bg-slate-500 hover:border-slate-400 p-2 rounded-lg items-center">
          <LogoutForm />
          <ArrowRightOnRectangleIcon className="h-6 w-6 text-white inline" />
        </div>
      </div>

      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </div>
  );
}
