"use client";

import getUserAction from "@/adaptor/serverActions/auth/getUserAction";
import createReviewAction from "@/adaptor/serverActions/createReviewAction";
import { generateId } from "@/util/idGenerator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MarkdownTextArea from "@/components/MarkdownTextArea";

type AnswerFormProps = {
  cardId: string;
};

const AnswerForm = ({ cardId }: AnswerFormProps) => {
  const router = useRouter();
  const [noteId] = useState(generateId(10));

  useEffect(() => {
    router.prefetch(`/play-cards/card/${cardId}/back?r=${noteId}`);
  }, [cardId, noteId, router]);

  const formAction = async (formData: FormData) => {
    const answerContents = formData.get("answer_contents") as string;

    if (!answerContents) return alert("정답을 입력해주세요");

    //FIXME: 제출 전 최종 확인 => custom confirm창 필요
    const user = await getUserAction();

    if (!user) throw new Error("Error: no user. createCard failed");

    await createReviewAction({
      userId: user.id,
      cardId,
      noteId,
      answerContents,
    });

    // 한 번 정답을 제출하면 이 페이지로 다시 돌아오지 못함
    router.replace(`/play-cards/card/${cardId}/back?r=${noteId}`);
  };

  return (
    <form
      action={formAction}
      className="flex flex-col-reverse w-full h-1/2 gap-4"
    >
      <input
        type="submit"
        value={"정답 확인"}
        className=" font-semibold text-[24px] bg-pink-300 px-6 py-3 rounded-xl hover:bg-pink-400 cursor-pointer text-white"
      />
      <MarkdownTextArea
        name="answer_contents"
        id="answer_contents"
        placeholder="여기에 정답을 입력하세요"
      />
    </form>
  );
};

export default AnswerForm;
