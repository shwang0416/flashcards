import { ReactNode } from "react";

const NoCards = ({ children }: { children: ReactNode }) => (
  <div className="jus roundedborder-2 flex h-full flex-col items-center justify-center gap-10 rounded-xl border-2 border-slate-300">
    <h4 className="text-4xl font-semibold">카드가 없습니다</h4>
    {children}
  </div>
);

export default NoCards;
