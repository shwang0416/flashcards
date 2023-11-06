const Page = () => {
  return (
    <div className="flex flex-col pt-4 gap-4 flex-grow">
      <div className=" w-full h-1/2 flex flex-col gap-4">
        <div className="p-4 bg-white rounded-xl">
          <h2 className="text-[50px] font-semibold">question title</h2>
        </div>
        <div className="p-4 bg-white rounded-xl flex-grow">
          <h2 className="text-[30px] font-semibold">question contents</h2>
        </div>
      </div>
      <div className=" w-full h-1/2 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-xl">
          <h2 className="text-[30px] font-semibold">answer row</h2>
        </div>
        <div className="p-4 bg-white rounded-xl">
          <h2 className="text-[30px] font-semibold">answer markdown</h2>
        </div>
      </div>
    </div>
  );
};

export default Page;
