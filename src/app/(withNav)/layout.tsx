import {
  PlayIcon,
  ArrowRightOnRectangleIcon,
  ArchiveBoxIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import LogoutForm from "@/components/auth/LogoutForm";
import { Suspense } from "react";
import LoadingSpinnerBox from "@/components/loading/LoadingSpinnerBox";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex justify-between rounded-xl bg-slate-600 p-2 ">
        <Link
          href="/daily-check-in"
          className="rounded-lg border border-transparent p-2 text-white hover:border-slate-400 hover:bg-slate-500"
        >
          <span className="mr-1 inline">Daily Check in</span>
          <CalendarDaysIcon className="hidden h-6 w-6 text-white md:inline" />
        </Link>
        <Link
          href="/play-cards"
          className="rounded-lg border border-transparent p-2 text-white hover:border-slate-400 hover:bg-slate-500"
        >
          <span className="mr-1 inline">Play Cards</span>
          <PlayIcon className="hidden h-6 w-6 text-white md:inline" />
        </Link>
        <Link
          href="/cards-box"
          className="rounded-lg border border-transparent p-2 text-white hover:border-slate-400 hover:bg-slate-500"
        >
          <span className="mr-1 inline">Cards Box</span>
          <ArchiveBoxIcon className="hidden h-6 w-6 text-white md:inline" />
        </Link>
        <div className="flex cursor-pointer flex-row items-center gap-x-1 rounded-lg border border-transparent p-2 text-white hover:border-slate-400 hover:bg-slate-500">
          <LogoutForm />
          <ArrowRightOnRectangleIcon className="hidden h-6 w-6 text-white md:inline" />
        </div>
      </div>

      <Suspense fallback={<LoadingSpinnerBox />}>{children}</Suspense>
    </div>
  );
}
