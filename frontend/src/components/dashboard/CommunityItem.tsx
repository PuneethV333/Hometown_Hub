/* eslint-disable @typescript-eslint/no-explicit-any */
const CommunityItem = ({ community }: { community: any }) => {
  const initials = community.name?.slice(0, 2).toUpperCase();

  const colors = [
    { bg: "#E8E4FF", text: "#5B4FCF" },
    { bg: "#E4F5EE", text: "#1D9E75" },
    { bg: "#FFF0E4", text: "#E07A30" },
    { bg: "#FFE4EE", text: "#D4537E" },
  ];
  const color = colors[community.name?.charCodeAt(0) % colors.length];

  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 overflow-hidden"
        style={{ background: color.bg, color: color.text }}
      >
        {community.icon ? (
          <img src={community.icon} alt={community.name} className="w-full h-full object-cover" />
        ) : (
          initials
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[#1A1A1A] truncate">{community.name}</p>
        <p className="text-[11px] text-[#9B9B9B]">
          {community.memberCount?.toLocaleString()} members · {community.type}
        </p>
      </div>
      <button className="flex-shrink-0 text-xs px-3 py-1.5 rounded-lg border border-[#5B4FCF] text-[#5B4FCF] hover:bg-[#5B4FCF] hover:text-white transition-all font-medium">
        Join
      </button>
    </div>
  );
};

export default CommunityItem;