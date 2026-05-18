/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSuggestedCommunities } from "../../Hooks/useCommunity";
import PeopleIcon from "../icons/PeopleIcon";
import SidebarSkeleton from "../shared/SidebarSkeleton";
// import PeopleIcon from "../icons/PeopleIcon";

// import SidebarSkeleton from "../shared/SidebarSkeleton";
import CommunityItem from "./CommunityItem";

const CommunitySuggestion = () => {
  const { data, isPending, isError } = useGetSuggestedCommunities();

  if (isPending) return <SidebarSkeleton title="Suggested communities" rows={3} />;
  if (isError) return null;

  const communities = data?.data ?? [];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#EBEBEB]">
      <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
        <PeopleIcon />
        Suggested communities
      </h3>

      {communities.length === 0 ? (
        <p className="text-xs text-[#9B9B9B] py-2">No suggestions available right now.</p>
      ) : (
        <div className="space-y-3">
          {communities.map((community: any) => (
            <CommunityItem key={community._id} community={community} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunitySuggestion;