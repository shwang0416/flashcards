import { ReactNode } from "react";

const Layout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => (
  <>
    {modal}
    <div className="flex h-full flex-col gap-4 pt-4">
      <div className="flex h-full flex-col gap-4 pt-4">{children}</div>
    </div>
  </>
);

export default Layout;
