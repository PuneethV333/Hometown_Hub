/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users } from "lucide-react";
import {
  useGetSuggestedCommunities,
  useJoinLeaveCommunity,
} from "../../Hooks/useCommunity";
import SidebarSkeleton from "./Helpers/SidebarSkeleton";
import { CommunityCard } from "../../Pages/SubPages/CommunityPage/CommunityCard";
import { useNavigate } from "react-router-dom";

const CommunitySuggestion = () => {
  const navigate = useNavigate();
  const { data, isPending, isError } = useGetSuggestedCommunities();
  const { mutate: joinLeave, isPending: isJoining } = useJoinLeaveCommunity();

  if (isPending) return <SidebarSkeleton rows={3} />;
  if (isError) return null;

  const communities: any[] = data?.data ?? [];

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
            <CommunityCard
              key={community._id}
              community={community}
              isMember={false}
              onJoin={() => joinLeave(community._id)}
              isJoining={isJoining}
              onClick={() => navigate(`/home/community/${community._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunitySuggestion;
