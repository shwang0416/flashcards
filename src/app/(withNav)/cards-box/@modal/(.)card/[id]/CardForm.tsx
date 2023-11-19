"use client";

import MarkdownTextArea from "@/components/MarkdownTextArea";
import { useState } from "react";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/SubmitButton";
import TagForm from "./TagForm";
// import timer from "@/util/timer";

type CardFormProps = {
  questionTitle: string;
  questionContents: string;
  answerContents: string;
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

type State = {
  message: string | null;
  type: string | null;
};

const CardForm = ({
  cardId,
  questionTitle,
  questionContents,
  answerContents,
  submitCallback,
  tags,
}: Props) => {
  const [localTags, setLocalTags] = useState(tags as string[]);

  const onSubmitHandler = async (_prevState: State, formData: FormData) => {
    // await timer(3000);
    const questionTitle = formData.get("question_title") as string;
    const questionContents = formData.get("question_contents") as string;
    const answerContents = formData.get("answer") as string;

    if (!questionTitle || !questionContents || !answerContents) {
      return {
        message: "내용을 모두 입력해주세요",
        type: "error",
      };
    }

    // FIXME: loading state

    await submitCallback({
      questionTitle,
      questionContents,
      answerContents,
      tags: localTags,
    });

    return {
      message: "제출에 성공했습니다",
      type: "success",
    };
  };

  const [state, dispatch] = useFormState(onSubmitHandler, {
    message: null,
    type: null,
  });
  console.log(state);

  const updateLocalTags = (tagList: string[]) => {
    setLocalTags(tagList);
  };
  return (
    <form
      id={`card_${cardId}`}
      action={dispatch}
      className="flex h-full w-full flex-col gap-y-2 overflow-hidden rounded-xl"
    >
      <input
        type="text"
        id="question_title"
        name="question_title"
        placeholder="문제 제목을 입력하세요"
        className="w-full rounded-xl p-4 text-[24px]"
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

      <SubmitButton
        active={{ buttonText: "Submit" }}
        inactive={{ buttonText: "Submitting..." }}
      />
    </form>
  );
};

export default CardForm;
