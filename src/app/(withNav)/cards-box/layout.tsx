import LoadingSpinnerBox from "@/components/loading/LoadingSpinnerBox";
import { ReactNode, Suspense } from "react";

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
      <div className="flex h-full flex-col gap-4 pt-4">
        <Suspense fallback={<LoadingSpinnerBox />}>{children}</Suspense>
      </div>
    </div>
  </>
);

export default Layout;
