// FIXME: color static하게 적용되도록 변경

const Tag = ({
  textContent,
  color,
}: {
  textContent: string;
  color: string;
}) => {
  return (
    <div
      className={`rounded-full py-1 border px-3 border-slate-500 w-fit h-fit text-sm`}
    >
      {textContent}
    </div>
  );
};

export default Tag;
