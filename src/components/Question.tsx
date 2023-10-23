const Question = async ({ question }: { question: string }) => {
  return (
    <div className="flex">
      <div></div>
      <h2>{question}</h2>
    </div>
  );
};

export default Question;
