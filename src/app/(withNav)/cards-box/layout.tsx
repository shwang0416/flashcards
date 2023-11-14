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
      {children}
    </>
  );

export default Layout;
