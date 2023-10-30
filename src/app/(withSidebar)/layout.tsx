import { ReactNode } from "react";

const SidebarLayout = async ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-grow">{children}</div>;
};

export default SidebarLayout;
