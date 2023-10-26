"use client";

import updateCardByIdAction from "@/adaptor/serverActions/updateCardByIdAction";

const clientAction = async (
  formData: any,
  cardId: string,
  correctCount: number,
  playCount: number,
) => {
  const answer = formData.get("answer");
  const newCorrectCount = answer === "yes" ? correctCount + 1 : correctCount;
  await updateCardByIdAction(cardId, {
    PlayCount: playCount + 1,
    CorrectCount: newCorrectCount,
  });
};

type Props = {
  cardId: string;
  correctCount: number;
  playCount: number;
};

const AskIsCorrectForm = ({ cardId, correctCount, playCount }: Props) => {
  return (
    <form
      className="flex flex-row gap-4"
      action={(formData) =>
        clientAction(formData, cardId, correctCount, playCount)
      }
    >
      <div className="">
        <label>YES</label>
        <input type="radio" id="answer-yes" name="answer" value="yes" />
      </div>
      <div className="">
        <label>NO</label>
        <input type="radio" id="answer-no" name="answer" value="no" />
      </div>
      <button type="submit">제출</button>
    </form>
  );
};

export default AskIsCorrectForm;
