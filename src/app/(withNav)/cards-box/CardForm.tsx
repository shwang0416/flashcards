"use client";

type CardFormProps = {
  questionTitle: string;
  questionContents: any;
  answer: any;
};

type Props = {
  id: string;
  submitCallback: ({
    questionTitle,
    questionContents,
    answer,
  }: CardFormProps) => Promise<void>;
};

const CardForm = ({ id, submitCallback }: Props) => {
  const onSubmitHandler = async (formData: FormData) => {
    const questionTitle = formData.get("question_title") as string;
    const questionContents = formData.get("question_contents") as string;
    const answer = formData.get("answer") as string;

    if (!questionTitle || !questionContents || !answer) {
      alert("내용을 모두 입력해주세요");
      return;
    }

    // FIXME: loading state

    await submitCallback({
      questionTitle,
      questionContents,
      answer,
    });
  };

  return (
    <form action={onSubmitHandler} className="w-full h-full">
      <div className="flex flex-col gap-y-2 w-full h-full">
        <input
          type="text"
          id="question_title"
          name="question_title"
          placeholder="question_title"
          className="w-full text-[24px] p-4 rounded-xl"
        />
        <div className="flex flex-col flex-grow gap-y-2">
          <div className="w-full text-lg h-1/2 flex flex-row gap-2">
            <textarea
              id="question_contents"
              name="question_contents"
              placeholder="question_contents"
              className="w-1/2 resize-none p-4 h-full rounded-xl bg-gray-50"
            />
            <div className="w-1/2 p-4 h-full rounded-xl bg-white">
              question contents (markdown)
            </div>
          </div>
          <div className="w-full text-lg h-1/2 flex flex-row gap-2">
            <textarea
              id="answer"
              name="answer"
              placeholder="answer"
              className="w-1/2 resize-none p-4 h-full rounded-xl bg-gray-50"
            />
            <div className="w-1/2 p-4 h-full rounded-xl bg-white">
              answer contents (markdown)
            </div>
          </div>
        </div>

        <input
          type="submit"
          value={"Submit"}
          className=" font-semibold text-[24px] bg-pink-300 px-6 py-3 rounded-xl hover:bg-pink-400 cursor-pointer text-white"
        />
      </div>
    </form>
  );
};

export default CardForm;
