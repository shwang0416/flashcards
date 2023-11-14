"use client";

import MarkdownTextArea from "@/components/MarkdownTextArea";
import { useState } from "react";
import TagForm from "./TagForm";

type CardFormProps = {
  questionTitle: string;
  questionContents: any;
  answerContents: any;
  tags: string[];
};

type Props = {
  cardId: string;
  submitCallback: ({
    questionTitle,
    questionContents,
    answerContents,
    tags,
  }: CardFormProps) => Promise<void>;
} & Partial<CardFormProps>;

const CardForm = ({
  cardId,
  questionTitle,
  questionContents,
  answerContents,
  submitCallback,
  tags,
}: Props) => {
  const [localTags, setLocalTags] = useState(tags as string[]);

  const onSubmitHandler = async (formData: FormData) => {
    const questionTitle = formData.get("question_title") as string;
    const questionContents = formData.get("question_contents") as string;
    const answerContents = formData.get("answer") as string;

    if (!questionTitle || !questionContents || !answerContents) {
      alert("내용을 모두 입력해주세요");
      return;
    }

    // FIXME: loading state

    await submitCallback({
      questionTitle,
      questionContents,
      answerContents,
      tags: localTags,
    });
  };

  const updateLocalTags = (tagList: string[]) => {
    setLocalTags(tagList);
  };
  return (
    <form
      action={onSubmitHandler}
      className="flex flex-col gap-y-2 w-full h-full overflow-hidden rounded-xl"
    >
      <input
        type="text"
        id="question_title"
        name="question_title"
        placeholder="문제 제목을 입력하세요"
        className="w-full text-[24px] p-4 rounded-xl"
        defaultValue={questionTitle}
      />

      <TagForm localTags={localTags} updateLocalTags={updateLocalTags} />
      <div className="w-full flex-1 overflow-y-auto">
        <MarkdownTextArea
          id="question_contents"
          name="question_contents"
          placeholder="문제 내용을 입력하세요"
          gap="gap-2"
        >
          {questionContents}
        </MarkdownTextArea>
      </div>
      <div className="w-full flex-1 overflow-y-auto">
        <MarkdownTextArea
          id="answer"
          name="answer"
          placeholder="정답을 입력하세요"
          gap="gap-2"
        >
          {answerContents}
        </MarkdownTextArea>
      </div>

      <input
        type="submit"
        value="Submit"
        className=" font-semibold text-[24px] bg-pink-300 px-6 py-3 rounded-xl hover:bg-pink-400 cursor-pointer text-white"
      />
    </form>
  );
};

export default CardForm;
