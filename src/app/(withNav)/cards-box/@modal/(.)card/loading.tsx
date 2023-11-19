const Loading = () => (
  <div
    role="status"
    className="mt-4 flex h-full w-full animate-pulse items-center justify-center "
  >
    <div className="flex h-full w-full flex-col gap-2">
      <div className="h-12" />
      <div className="h-[40px] rounded-xl bg-gray-50 " />
      <div className="flex flex-grow flex-col gap-2 text-xl">
        <div className="flex h-full  w-full flex-col-reverse gap-2 rounded-xl bg-gray-50 " />
      </div>
      <div className="rounded-xl bg-gray-200 px-6 py-3 text-[24px] text-gray-200">
        ...
      </div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
);
export default Loading;
