const AskserverAction = async (event: any) => {
  "use server";
};

const AskIsCorrect = () => {
  // radio
  return (
    <div className=" h-60 flex flex-col rounded-xl shadow-lg p-12">
      <h6 className="text-lg font-medium pb-10">정답을 맞추셨나요?</h6>
      <form className="flex flex-row gap-4" action={AskserverAction}>
        <div className="">
          <label>YES</label>
          <input type="radio" id="answer-yes" name="answer" value="yes" />
        </div>
        <div className="">
          <label>🤔</label>
          <input type="radio" id="answer-hmmm" name="answer" value="hmmm" />
        </div>
        <div className="">
          <label>NO</label>
          <input type="radio" id="answer-no" name="answer" value="no" />
        </div>
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default AskIsCorrect;
