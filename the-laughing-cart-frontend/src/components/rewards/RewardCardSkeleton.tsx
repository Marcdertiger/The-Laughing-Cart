const RewardCardSkeleton = () => {
  return (
    <div className="border p-4 rounded-lg bg-white shadow-sm flex gap-4 animate-pulse">
      <div className="w-16 h-16 bg-gray-200 rounded" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="mt-4 h-8 bg-gray-200 rounded w-24" />
      </div>
    </div>
  );
};

export default RewardCardSkeleton;