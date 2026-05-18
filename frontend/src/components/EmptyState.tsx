const EmptyState = ({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) => (
  <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#EBEBEB] text-center">
    <p className="text-3xl mb-3">{icon}</p>
    <p className="text-sm font-semibold text-[#1A1A1A] mb-1">{title}</p>
    <p className="text-xs text-[#9B9B9B]">{subtitle}</p>
  </div>
);

export default EmptyState;