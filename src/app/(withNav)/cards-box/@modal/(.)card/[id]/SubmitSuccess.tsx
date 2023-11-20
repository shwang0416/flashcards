import { CheckCircleIcon } from "@heroicons/react/24/outline";

const SubmitSuccess = () => (
  <div className="flex h-full flex-col items-center justify-center gap-10">
    <CheckCircleIcon className="h-72 w-72 text-green-500" />
    <h2 className="text-4xl">제출 완료</h2>
  </div>
);

export default SubmitSuccess;
