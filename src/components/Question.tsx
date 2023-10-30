const Question = async ({ question }: { question: string }) => {
  return (
    <div className="">
      <h2 className="text-2xl">{question}</h2>
    </div>
  );
};

export default Question;
