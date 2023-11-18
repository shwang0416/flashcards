import { ReactNode } from "react";

type InfoCardItemProps = {
  title: string;
  children: ReactNode;
};
const InfoCardItem = ({ title, children }: InfoCardItemProps) => (
  <div className="flex h-60 flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-gray-300 bg-gray-100 p-6">
    <h4 className="text-2xl font-semibold">{title}</h4>
    {children}
  </div>
);

export default InfoCardItem;
