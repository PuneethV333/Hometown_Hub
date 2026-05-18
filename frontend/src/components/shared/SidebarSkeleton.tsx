/* eslint-disable @typescript-eslint/no-unused-vars */
const SidebarSkeleton = ({ title, rows }: { title: string; rows: number }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#EBEBEB]">
    <div className="w-32 h-3.5 rounded bg-[#F0F0F0] animate-pulse mb-4" />
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F0F0F0] animate-pulse flex-shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="w-3/4 h-2.5 rounded bg-[#F0F0F0] animate-pulse" />
            <div className="w-1/2 h-2 rounded bg-[#F0F0F0] animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SidebarSkeleton;