import getCardById from "@/adaptor/serverActions/getCardByIdAction";
import Answer from "@/components/Answer";
import Question from "@/components/Question";
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

  console.log(`cardId: ${cardId}`);
  const { properties } = await getCardById(cardId);
  const { Tags, PlayCount, Name, CorrectCount } = properties;
  const title = Name.title[0].text.content;
  const tags = Tags.multi_select;
  const playCount = PlayCount.number;
  const correctCount = CorrectCount.number;

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between bg-yellow-300 h-20 w-full">
          <div>
            {tags.map((tag: Tag) => (
              <span key={tag.id}>{tag.name}</span>
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
          <>
            <Link href={`?flip=a`}>정답 공개</Link>
          </>
        )}
      </div>
    </>
  );
};

export default Page;
