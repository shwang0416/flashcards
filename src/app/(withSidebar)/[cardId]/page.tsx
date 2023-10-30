import getCardById from "@/adaptor/serverActions/getCardByIdAction";
import Answer from "@/components/Answer";
import Question from "@/components/Question";
import Tag from "@/components/Tag";
import Link from "next/link";

type Tag = {
  id: string;
  name: string;
  color: string;
};

const Page = async ({
  params,
  searchParams,
}: {
  params: { cardId: string };
  searchParams: { flip: "q" | "a" };
}) => {
  const { cardId } = params;
  const { flip } = searchParams;

  const { properties } = await getCardById(cardId);
  const { Tags, PlayCount, Title, CorrectCount } = properties;
  const title = Title.title[0].text.content;
  const tags = Tags.multi_select;
  const playCount = PlayCount.number;
  const correctCount = CorrectCount.number;

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between bg-yellow-300 h-15 w-full">
          <div className="flex flex-row p-5 gap-2">
            {tags.map((tag: Tag) => (
              <Tag textContent={tag.name} color={tag.color} key={tag.id} />
            ))}
          </div>
          {playCount && (
            <div className="">
              {correctCount}/{playCount}
            </div>
          )}
        </div>
        <Question question={title} />
        {flip === "a" ? (
          <Answer cardId={cardId} />
        ) : (
          <div className="flex justify-center items-center flex-grow">
            <Link
              className="w-fit h-fit px-10 bg-slate-600 text-white hover:bg-pink-300 hover:text-slate-800 py-6 rounded-2xl text-2xl"
              href={`?flip=a`}
            >
              정답 공개
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
