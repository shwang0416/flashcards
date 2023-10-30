import { ReactNode } from "react";

const SidebarLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-grow">
      {children}
      <div className="flex gap-6 flex-col flex-grow justify-center items-center bg-amber-300">
        <h5 className="text-xl">No cards available now</h5>
        <a
          target="_blank"
          href={`${process.env.NOTION_BASE_URL}/${process.env.NOTION_DATABASE_ID}`}
          rel="noopener noreferrer"
          className="bg-white text-yellow-500 rounded-xl px-2 py-1"
        >
          Check the stored cards
        </a>
      </div>
    </div>
  );
};

export default SidebarLayout;
