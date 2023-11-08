"use client";

import getUserAction from "@/adaptor/serverActions/auth/getUserAction";
import createReviewAction from "@/adaptor/serverActions/createReviewAction";
import { generateId } from "@/util/idGenerator";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import debounce from "@/util/debounce";
import parse from "html-react-parser";

type AnswerFormProps = {
  cardId: string;
};

const AnswerForm = ({ cardId }: AnswerFormProps) => {
  const router = useRouter();
  const [noteId] = useState(generateId(10));
  const [markedContents, setMarkedContents] = useState<string>();

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch(`/play-cards/card/${cardId}/back?r=${noteId}`);
  }, [cardId, noteId, router]);

  const textareaOnChangeHandler = useMemo(
    () =>
      debounce((event: any) => {
        event.preventDefault();
        setMarkedContents(marked(event.target.value));
      }, 100),
    [],
  );

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
      <div className=" w-full flex-grow grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-xl">
          <textarea
            className="resize-none p-4 w-full h-full rounded-xl bg-transparent outline-none"
            name="answer_contents"
            id="answer_contents"
            placeholder="여기에 정답을 입력하세요"
            onChange={textareaOnChangeHandler}
          />
        </div>
        <div className="p-4 bg-white rounded-xl">
          {markedContents && parse(markedContents)}
          <h2 className="text-[30px] font-semibold"></h2>
        </div>
      </div>
    </form>
  );
};

export default AnswerForm;
