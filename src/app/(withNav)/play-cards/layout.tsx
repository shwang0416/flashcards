import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-grow flex-col gap-4 pt-4">
    <div className="rounded-xl bg-white p-4 py-10">
      <h2 className="text-[50px] font-semibold">Play Cards</h2>
    </div>
    <div className="flex-grow rounded-xl bg-white p-4 py-10">{children}</div>
  </div>
);

export default Layout;
