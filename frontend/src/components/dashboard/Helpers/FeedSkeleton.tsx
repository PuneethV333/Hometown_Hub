const SkeletonLine = ({ w = "full" }: { w?: string }) => (
  <div className={`h-3 rounded-lg bg-[#1e1e2e] animate-pulse w-${w}`} />
);

const PostSkeleton = () => (
  <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-5">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-full bg-[#1e1e2e] animate-pulse shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonLine w="1/3" />
        <SkeletonLine w="1/5" />
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <SkeletonLine />
      <SkeletonLine w="5/6" />
      <SkeletonLine w="4/6" />
    </div>
    <div className="h-36 rounded-xl bg-[#1e1e2e] animate-pulse" />
  </div>
);

const FeedSkeleton = () => (
  <div className="flex flex-col gap-4">
    <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#1e1e2e] animate-pulse shrink-0" />
        <div className="flex-1 h-9 rounded-xl bg-[#1e1e2e] animate-pulse" />
      </div>
    </div>
    <PostSkeleton />
    <PostSkeleton />
    <PostSkeleton />
  </div>
);

export default FeedSkeleton;
