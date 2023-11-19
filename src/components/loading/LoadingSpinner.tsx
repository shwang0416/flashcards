const LoadingSpinner = () => (
  <div className="flex h-full items-center justify-center">
    <div
      className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-slate-200 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    />
  </div>
);

export default LoadingSpinner;
