/* eslint-disable @typescript-eslint/no-explicit-any */
import FeedSkeleton from "../../../components/dashboard/Helpers/FeedSkeleton";
import PostCard from "../../../components/dashboard/Helpers/PostCard";


import { Frown } from "lucide-react";
import { useGetCommunityPosts } from "../../../Hooks/usePost";

interface CommunityFeedProps {
  communityId: string;
  currentUserId?: string;
}

const CommunityFeed = ({ communityId, currentUserId }: CommunityFeedProps) => {
  const { data, isPending, isError } = useGetCommunityPosts(communityId);

  const posts = data?.posts ?? [];
  
  
  

  if (isPending) return <FeedSkeleton />;

  if (isError) return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Frown className="text-[#3a3a52]" size={36} />
      <p className="text-sm text-[#4a4a62]">Failed to load posts</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 rounded-2xl border border-[#2a2a38] bg-[#13131a]">
          <span className="text-4xl">📭</span>
          <p className="text-sm font-medium text-[#6a6a8a]">No posts yet</p>
          <p className="text-xs text-[#3a3a52]">Be the first to post in this community</p>
        </div>
      ) : (
        posts.map((post: any) => (
          <PostCard key={post._id} post={post} currentUserId={currentUserId} />
        ))
      )}
    </div>
  );
};

export default CommunityFeed;