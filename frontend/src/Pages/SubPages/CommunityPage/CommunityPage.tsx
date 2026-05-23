/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetCommunity, useJoinLeaveCommunity } from "../../../Hooks/useCommunity";
import { useGetMe } from "../../../Hooks/useGetMe";
import CommunityPageSkeleton from "./CommunityPageSkeleton";
import CommunityHeader from "./CommunityHeader";
import CommunityFeed from "./CommunityFeed";

const CommunityPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, isError } = useGetCommunity(id!);
  const { data: me } = useGetMe();
  const { mutate: joinLeave, isPending: isJoining } = useJoinLeaveCommunity();

  const community = data?.data;
  
  const isMember = me?.myCommunities?.some(
    (x: any) => x._id === id || x === id || x?.toString() === id
  );

  if (isPending) return <CommunityPageSkeleton />;

  if (isError || !community) return (
    <div className="flex items-center justify-center min-h-full">
      <p className="text-sm text-[#4a4a62]">Community not found</p>
    </div>
  );

  return (
    <div className="min-h-full bg-[#0d0d12] p-6">
      <div className="max-w-3xl mx-auto space-y-5">
        <CommunityHeader
          community={community}
          isMember={!!isMember}
          isJoining={isJoining}
          onJoinLeave={() => joinLeave(id!)}
        />
        <CommunityFeed communityId={id!} currentUserId={me?._id} />
      </div>
    </div>
  );
};

export default CommunityPage;