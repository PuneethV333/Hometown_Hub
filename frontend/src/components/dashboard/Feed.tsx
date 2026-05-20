/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetPost } from "../../Hooks/usePost";
import { Frown } from "lucide-react";
import FeedSkeleton from "./Helpers/FeedSkeleton";
import ComposeBox from "./Helpers/ComposeBox";
import PostCard from "./Helpers/PostCard";

const Feed = () => {
  const { data, isPending, isError } = useGetPost();
  
  const posts = data?.posts ?? [];
  if (isPending)  <FeedSkeleton />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Frown className="text-[#3a3a52]" size={36} />
        <p className="text-sm text-[#4a4a62]">Failed to load posts</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-4">
      <ComposeBox />

      {posts?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3 rounded-2xl border border-[#2a2a38] bg-[#13131a]">
          <span className="text-4xl">📭</span>
          <p className="text-sm font-medium text-[#6a6a8a]">No posts yet</p>
          <p className="text-xs text-[#3a3a52]">
            Join communities to see posts from your hometown
          </p>
        </div>
      ) : (
        posts.map((post: any) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Feed;
