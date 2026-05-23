/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users, MapPin } from "lucide-react";

interface CommunityHeaderProps {
  community: any;
  isMember: boolean;
  isJoining: boolean;
  onJoinLeave: () => void;
}

const CommunityHeader = ({
  community,
  isMember,
  isJoining,
  onJoinLeave,
}: CommunityHeaderProps) => {
  return (
    <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl overflow-hidden">
      <div className="h-24 bg-linear-to-r from-[#1e1a2e] to-[#2d1f5e]" />

      <div className="px-5 pb-5">
        <div className="w-16 h-16 rounded-xl border-2 border-[#0d0d12] overflow-hidden -mt-8 mb-3 bg-[#1e1e2e] flex items-center justify-center text-xl font-bold text-[#7c6fff]">
          {community.icon ? (
            <img
              src={community.icon}
              alt={community.name}
              className="w-full h-full object-cover"
            />
          ) : (
            community.name?.[0]?.toUpperCase()
          )}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-[#e0e0f0]">
              {community.name}
            </h1>

            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#1e1e2e] border border-[#2a2a38] text-[#7c6fff]">
                {community.type}
              </span>

              <div className="flex items-center gap-1 text-xs text-[#3a3a52]">
                <MapPin size={11} />
                <span>
                  {community.location?.city}, {community.location?.state}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs text-[#3a3a52]">
                <Users size={11} />
                <span>{community.memberCount?.toLocaleString()} members</span>
              </div>
            </div>
          </div>

          <button
            onClick={onJoinLeave}
            disabled={isJoining}
            className={`shrink-0 px-5 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              isMember
                ? "bg-[#1e1e2e] border border-[#2a2a38] text-[#7b7a9a] hover:border-red-500/50 hover:text-red-400"
                : "bg-[#2d1f5e] border border-violet-600/30 text-[#c4b5fd] hover:bg-[#3a2970]"
            }`}
          >
            {isJoining ? "..." : isMember ? "Leave" : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
