import Dialog from "@/components/Dialog";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <Dialog>{children}</Dialog>
);

export default Layout;
