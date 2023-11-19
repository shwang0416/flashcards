const LoadingSpinner = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div
      className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-slate-300 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    />
  </div>
);

export default LoadingSpinner;
