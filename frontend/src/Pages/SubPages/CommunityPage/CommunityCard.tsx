/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight, MapPin, Users } from "lucide-react";

export const CommunityCard = ({
  community,
  isMember,
  onClick,
  onJoin,
  isJoining,
}: {
  community: any;
  isMember: boolean;
  onClick: () => void;
  onJoin?: () => void;
  isJoining?: boolean;
}) => {
  const initials = community.name?.slice(0, 2).toUpperCase();

  return (
    <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-4 hover:border-[#3a3a52] transition-colors">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl overflow-hidden bg-[#1e1e2e] border border-[#2a2a38] flex items-center justify-center text-sm font-bold text-[#7c6fff] shrink-0 cursor-pointer"
          onClick={onClick}
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

        {/* Info */}
        <div className="flex-1 min-w-0 cursor-pointer" onClick={onClick}>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-[#e0e0f0] truncate">
              {community.name}
            </p>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1e1e2e] border border-[#2a2a38] text-[#7c6fff] shrink-0">
              {community.type}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-0.5">
            <div className="flex items-center gap-1 text-xs text-[#3a3a52]">
              <Users size={10} />
              <span>{community.memberCount?.toLocaleString() ?? 0} members</span>
            </div>

            {community.location?.city && (
              <div className="flex items-center gap-1 text-xs text-[#3a3a52]">
                <MapPin size={10} />
                <span>{community.location.city}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action */}
        {isMember ? (
          <button
            onClick={onClick}
            className="flex items-center gap-1 text-xs text-[#3a3a52] hover:text-[#7c6fff] transition-colors shrink-0"
          >
            View
            <ChevronRight size={14} />
          </button>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); onJoin?.(); }}
            disabled={isJoining}
            className="shrink-0 text-xs px-3 py-1.5 rounded-lg border border-[#2a2a38] text-[#7c6fff] hover:bg-[#1e1e2e] hover:border-[#7c6fff] transition-all font-medium disabled:opacity-50"
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
};