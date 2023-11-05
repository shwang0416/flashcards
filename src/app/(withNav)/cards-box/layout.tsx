import { ReactNode } from "react";

const Layout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  return (
    <>
      {modal}
      {children}
    </>
  );
};

export default Layout;
