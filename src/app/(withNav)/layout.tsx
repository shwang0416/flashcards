import {
  HomeIcon,
  PlayIcon,
  QuestionMarkCircleIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import LogoutForm from "@/components/auth/LogoutForm";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between bg-slate-600 p-2 rounded-xl ">
        <Link href="/" className="text-white hover:bg-pink-300 p-2 rounded-lg">
          <HomeIcon className="h-6 w-6 text-white" />
        </Link>
        <Link
          href="/play-cards"
          className="text-white hover:bg-pink-300 p-2 rounded-lg"
        >
          <PlayIcon className="h-6 w-6 text-white inline" />
          <span className="ml-1 inline">Play Cards</span>
        </Link>
        <Link
          href="/cards-box"
          className="text-white hover:bg-pink-300 p-2 rounded-lg"
        >
          <ArchiveBoxIcon className="h-6 w-6 text-white inline" />
          <span className="ml-1 inline">Cards Box</span>
        </Link>
        <div className="flex gap-x-2 text-white hover:bg-pink-300 p-2 rounded-lg">
          <LogoutForm />
          <Link href="/">
            <QuestionMarkCircleIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>

      <Suspense
        fallback={<div className="w-full h-full bg-rose-500">loading ... </div>}
      >
        {children}
      </Suspense>
    </div>
  );
}
