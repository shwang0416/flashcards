import Tag from "@/components/Tag";

const TagDetail = ({ tagList }: { tagList: string[] }) => (
  <div className="flex flex-row w-full p-2 gap-x-1 items-center bg-white rounded-xl h-10 min-h-fit">
    {tagList &&
      tagList?.map((tag) => (
        <Tag
          textContent={tag}
          key={`key_${tag}`}
          color="pink"
          deleteable={false}
        />
      ))}
  </div>
);

export default TagDetail;
