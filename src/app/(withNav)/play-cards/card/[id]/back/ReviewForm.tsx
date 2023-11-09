"use client";

import updateReviewAction from "@/adaptor/serverActions/updateReviewAction";
import MarkdownTextArea from "@/components/MarkdownTextArea";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ReviewFormProps = {
  noteId: string;
  nextCardId: string;
};

const getNextPath = (nextCardId: string) => {
  if (!!nextCardId) return `/play-cards/card/${nextCardId}/front`;
  return "/play-cards/end";
};

const ReviewForm = ({ noteId, nextCardId }: ReviewFormProps) => {
  const router = useRouter();
  const nextPath = getNextPath(nextCardId);

  useEffect(() => {
    router.prefetch(nextPath);
  }, [nextPath, router]);

  const formAction = async (formData: FormData) => {
    const reviewContents = formData.get("review_contents") as string;

    if (!reviewContents)
      return confirm(
        "오답노트를 작성하지 않으시나요? 확인을 누르면 오답노트를 생략합니다",
      );

    await updateReviewAction({
      noteId,
      reviewContents,
    });

    // 한 번 정답을 제출하면 이 페이지로 다시 돌아오지 못함
    router.replace(nextPath);
  };

  return (
    <form
      action={formAction}
      className="flex flex-col-reverse w-full h-1/2 gap-4"
    >
      <input
        type="submit"
        value={"다음으로"}
        className=" font-semibold text-[24px] bg-pink-300 px-6 py-3 rounded-xl hover:bg-pink-400 cursor-pointer text-white"
      />

      <MarkdownTextArea
        name="review_contents"
        id="review_contents"
        placeholder="정답을 맞추셨나요? 이번에 작성한 답에서 보완할 점은 무엇인가요?"
      />
    </form>
  );
};

export default ReviewForm;
