const Loading = () => (
  <div className="mt-4 flex h-full items-center justify-center">
    <div className="flex h-full w-full flex-col gap-4">
      <div className="rounded-xl bg-gray-100 p-4" />
      <div className="flex-grow rounded-xl bg-gray-100 p-4 text-xl" />

      <div className="flex h-1/2 w-full flex-col-reverse gap-4">
        <div className="cursor-pointer rounded-xl bg-pink-300 px-6 py-3 text-center text-[24px] font-semibold text-white hover:bg-pink-400">
          ...
        </div>
        <div className="grid flex-grow grid-cols-2 gap-4 rounded-xl text-xl">
          <div className="rounded-xl bg-gray-100 p-4" />
          <div className="rounded-xl bg-gray-100 p-4" />
        </div>
      </div>
    </div>
  </div>
);

export default Loading;
