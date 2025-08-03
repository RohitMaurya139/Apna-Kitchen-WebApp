const Shimmer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
      {Array(12)
        .fill("")
        .map((_, i) => (
          <div
            key={i}
            className="rounded-lg bg-gray-200 animate-pulse h-56 w-full"
          >
            <div className="h-32 w-full bg-gray-300 rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-2/3" />
              <div className="h-3 bg-gray-300 rounded w-1/2" />
              <div className="h-3 bg-gray-300 rounded w-1/3" />
            </div>
          </div>
        ))}
    </div>
  );
};
export default Shimmer;
