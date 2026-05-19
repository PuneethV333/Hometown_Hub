const SidebarSkeleton = ({ rows = 3 }: { rows?: number }) => (
  <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-4">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-4 h-4 rounded bg-[#1e1e2e] animate-pulse" />
      <div className="w-32 h-3.5 rounded-lg bg-[#1e1e2e] animate-pulse" />
    </div>

    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#1e1e2e] animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-2.5 rounded-lg bg-[#1e1e2e] animate-pulse w-3/4" />
            <div className="h-2 rounded-lg bg-[#1e1e2e] animate-pulse w-1/2" />
          </div>
          <div className="w-12 h-6 rounded-lg bg-[#1e1e2e] animate-pulse shrink-0" />
        </div>
      ))}
    </div>
  </div>
);

export default SidebarSkeleton;
