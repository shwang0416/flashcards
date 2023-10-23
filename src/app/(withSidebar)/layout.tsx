import getPairs from "@/adaptor/serverActions/getPairsAction";
import Tag from "@/components/Tag";
import { ReactNode } from "react";

const SidebarLayout = async ({ children }: { children: ReactNode }) => {
  const pairs = await getPairs();

  return (
    <div className="flex flex-row flex-grow">
      <div className="bg-slate-300 flex flex-col w-fit">
        {pairs.map((pair) => {
          const { id, title, playCount, TagSatisfactionStatus, tags } = pair;

          return (
            <a
              className="grid grid-cols-[250px_150px_50px] p-2 gap-x-3 h-20 items-center hover:bg-pink-300"
              key={id}
              href={`/${id}`}
            >
              <span className="w-60">{title}</span>
              <div className="flex flex-col gap-y-1">
                {tags.map((tag) => (
                  <Tag textContent={tag.name} color={tag.color} key={tag.id} />
                ))}
              </div>

              <span>{playCount}</span>
              {/* <span>{TagSatisfactionStatus}</span> */}
            </a>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default SidebarLayout;
