const CommunityPageSkeleton = () => (
  <div className="min-h-full bg-[#0d0d12] p-6">
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl overflow-hidden">
        <div className="h-24 bg-[#1e1e2e] animate-pulse" />
        <div className="px-5 pb-5">
          <div className="w-16 h-16 rounded-xl bg-[#2a2a38] animate-pulse -mt-8 mb-3" />
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="w-40 h-5 rounded-lg bg-[#1e1e2e] animate-pulse" />
              <div className="w-56 h-3 rounded-lg bg-[#1e1e2e] animate-pulse" />
            </div>
            <div className="w-20 h-9 rounded-xl bg-[#1e1e2e] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CommunityPageSkeleton;