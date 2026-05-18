/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetPost } from "../../Hooks/usePost";
import ComposeBox from "../ComposeBox";
import EmptyState from "../EmptyState";
import ErrorCard from "../ErrorCard";
import PostCard from "../PostCard";
import FeedSkeleton from "../shared/FeedSkeleton";
// import ComposeBox from "./ComposeBox";
// import PostCard from "./PostCard";
// import FeedSkeleton from "../shared/FeedSkeleton";
// import ErrorCard from "../shared/ErrorCard";
// import EmptyState from "../shared/EmptyState";

const Feed = () => {
  const { data, isPending, isError } = useGetPost();

  if (isPending) return <FeedSkeleton />;
  if (isError) return <ErrorCard message="Failed to load posts" />;

  const posts = data?.data ?? [];

  return (
    <div className="space-y-4">
      {/* Compose box */}
      <ComposeBox />

      {posts.length === 0 ? (
        <EmptyState
          icon="📭"
          title="No posts yet"
          subtitle="Join communities to see posts from your hometown"
        />
      ) : (
        posts.map((post: any) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Feed;