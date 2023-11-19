import BigLoadingSpinner from "./BigLoadingSpinner";

const LoadingSpinnerBox = () => (
  <div
    role="status"
    className="flex h-full w-full animate-pulse items-center justify-center rounded-xl bg-white"
  >
    <div className="flex h-full w-full items-center justify-center rounded-xl  bg-gray-100 p-6 ">
      <BigLoadingSpinner />
    </div>

    <span className="sr-only">Loading...</span>
  </div>
);

export default LoadingSpinnerBox;
