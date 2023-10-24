const Question = async ({ question }: { question: string }) => {
  return (
    <div className="flex px-32 py-20">
      <h2 className="text-2xl">{question}</h2>
    </div>
  );
};

export default Question;
