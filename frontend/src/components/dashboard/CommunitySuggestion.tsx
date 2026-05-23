/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users } from "lucide-react";
import { useGetSuggestedCommunities } from "../../Hooks/useCommunity";
import SidebarSkeleton from "./Helpers/SidebarSkeleton";

const getAccent = (name: string) => {
  const accents = [
    { bg: "#1e1a2e", border: "#3a2a5e", text: "#7c6fff" },
    { bg: "#1a2e1e", border: "#2a5e3a", text: "#4dd9ac" },
    { bg: "#2e1a1a", border: "#5e2a2a", text: "#ff6b8a" },
    { bg: "#1a2a2e", border: "#2a4a5e", text: "#5ab4ff" },
  ];
  return accents[(name?.charCodeAt(0) ?? 0) % accents.length];
};

const CommunitySuggestion = () => {
  const { data, isPending, isError } = useGetSuggestedCommunities();

  if (isPending) return <SidebarSkeleton rows={3} />;
  if (isError) return null;

  const communities: any[] = data ?? [];

  return (
    <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users size={15} className="text-[#7c6fff]" />
        <h3 className="text-sm font-semibold text-[#e0e0f0]">
          Suggested for you
        </h3>
      </div>

      {communities.length === 0 ? (
        <p className="text-xs text-[#3a3a52] py-2">No suggestions right now.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {communities.map((community: any) => (
            <CommunityItem key={community._id} community={community} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommunityItem = ({ community }: { community: any }) => {
  const accent = getAccent(community.name);
  const initials = community.name?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <div className="flex items-center gap-3 group">
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden border transition-colors"
        style={{
          background: accent.bg,
          borderColor: accent.border,
          color: accent.text,
        }}
      >
        {community.icon ? (
          <img
            src={community.icon}
            alt={community.name}
            className="w-full h-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[#c0c0e0] truncate">
          {community.name}
        </p>
        <p className="text-[11px] text-[#3a3a52]">
          {community.memberCount?.toLocaleString()} members · {community.type}
        </p>
      </div>

      <button
        className="shrink-0 text-[11px] px-3 py-1.5 rounded-lg border border-[#2a2a38] text-[#7c6fff] hover:bg-[#1e1e2e] hover:border-[#7c6fff] transition-all font-medium"
        onClick={() => {}}
      >
        Join
      </button>
    </div>
  );
};

export default CommunitySuggestion;
