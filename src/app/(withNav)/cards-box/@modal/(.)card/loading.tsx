const Loading = () => (
  <div
    role="status"
    className="mt-4 flex h-full w-full animate-pulse items-center justify-center "
  >
    <div className="flex h-full w-full flex-col gap-2">
      <div className="h-20" />
      <div className="h-[40px] rounded-xl bg-gray-50 dark:bg-pink-200" />
      <div className="flex flex-grow flex-col gap-2 text-xl">
        <div className="flex h-1/2  w-full flex-col-reverse gap-2 rounded-xl bg-gray-50 dark:bg-pink-200" />
        <div className="flex h-1/2  w-full flex-col-reverse gap-2 rounded-xl bg-gray-50 dark:bg-pink-200" />
      </div>
      <div className="h-16 rounded-xl bg-gray-200" />
    </div>
    <span className="sr-only">Loading...</span>
  </div>
);
export default Loading;
