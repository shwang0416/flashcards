import { HomeIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import LogoutForm from "@/components/auth/LogoutForm";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="flex justify-between bg-slate-600 p-5">
        <Link href="/">
          <HomeIcon className="h-6 w-6 text-white" />
        </Link>
        <div className="flex gap-x-2">
          <LogoutForm />
          <Link href="/">
            <QuestionMarkCircleIcon className="h-6 w-6 text-white" />
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
