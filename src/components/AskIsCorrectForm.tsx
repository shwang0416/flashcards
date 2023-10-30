"use client";

import updateCardByIdAction from "@/adaptor/serverActions/updateCardByIdAction";
import useNextCard from "@/hooks/useNextCard";

const clientAction = async (
  formData: any,
  cardId: string,
  ValidFrom: any,
  playCount: number,
) => {
  const answer = formData.get("answer");
  const nextValidFrom = new Date();
  if (answer === "again") {
    //again: 1 min
    nextValidFrom.setMinutes(nextValidFrom.getMinutes() + 1);
  } else if (answer === "good") {
    //good: 1 day
    nextValidFrom.setHours(nextValidFrom.getHours() + 24);
  } else {
    //easy: 3 days
    nextValidFrom.setHours(nextValidFrom.getHours() + 72);
  }
  await updateCardByIdAction(cardId, {
    PlayCount: playCount + 1,
    ValidFrom: { ...ValidFrom, start: nextValidFrom.toISOString() },
  });
};

type Props = {
  cardId: string;
  ValidFrom: any;
  playCount: number;
};

const AskIsCorrectForm = ({ cardId, ValidFrom, playCount }: Props) => {
  const { goNext } = useNextCard();
  return (
    <form
      className="flex flex-row gap-4"
      action={(formData) => {
        clientAction(formData, cardId, ValidFrom, playCount);
        goNext();
      }}
    >
      <div className="">
        <label>Again</label>
        <input type="radio" id="answer-again" name="answer" value="again" />
      </div>
      <div className="">
        <label>Good</label>
        <input type="radio" id="answer-good" name="answer" value="good" />
      </div>
      <div className="">
        <label>Easy</label>
        <input type="radio" id="answer-easy" name="answer" value="easy" />
      </div>
      <button type="submit">제출</button>
    </form>
  );
};

export default AskIsCorrectForm;
