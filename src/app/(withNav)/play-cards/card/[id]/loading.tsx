const Loading = () => {
  return (
    <div className="mt-4 flex justify-center items-center h-full">
      <div className="w-full h-full flex flex-col gap-4">
        <div className="p-4 bg-gray-100 rounded-xl">
          <h4 className="text-4xl font-semibold h-24"></h4>
        </div>
        <div className="p-4 bg-gray-100 rounded-xl flex-grow text-xl"></div>

        <div className="flex flex-col-reverse w-full h-1/2 gap-4">
          <div className="text-center font-semibold text-[24px] bg-pink-300 px-6 py-3 rounded-xl hover:bg-pink-400 cursor-pointer text-white">
            ...
          </div>
          <div className="grid grid-cols-2 rounded-xl gap-4 flex-grow text-xl">
            <div className="p-4 bg-gray-100 rounded-xl"></div>
            <div className="p-4 bg-gray-100 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
