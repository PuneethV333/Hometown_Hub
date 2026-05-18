const FeedSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-[#EBEBEB]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[#F0F0F0] animate-pulse" />
          <div className="space-y-1.5">
            <div className="w-28 h-3 rounded bg-[#F0F0F0] animate-pulse" />
            <div className="w-16 h-2.5 rounded bg-[#F0F0F0] animate-pulse" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="w-full h-3 rounded bg-[#F0F0F0] animate-pulse" />
          <div className="w-4/5 h-3 rounded bg-[#F0F0F0] animate-pulse" />
          <div className="w-3/5 h-3 rounded bg-[#F0F0F0] animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

export default FeedSkeleton;