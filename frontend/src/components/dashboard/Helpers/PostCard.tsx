/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useLikePost } from "../../../Hooks/usePost";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CommentSection from "../../../Pages/SubPages/Comment/CommentSection";
import { useGetMe } from "../../../Hooks/useGetMe";

const getTimeAgo = (dateStr: string) => {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

interface PostCardProps {
  post: any;
}

const PostCard = ({ post }: PostCardProps) => {
  const author    = post.userId;
  const community = post.communityId;

  const { data: me }            = useGetMe();
  const { mutate: likePost }    = useLikePost(me?._id);
  const navigate                = useNavigate();
  const [showComments, setShowComments] = useState(false);

  const isLiked = me?._id
    ? post.likedBy?.some(
        (id: any) =>
          id?.toString() === me._id ||
          id?._id?.toString() === me._id,
      )
    : false;

  return (
    <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-5 hover:border-[#3a3a52] transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1e1e2e] border border-[#2a2a38] flex items-center justify-center text-xs font-semibold text-[#7c6fff] overflow-hidden shrink-0">
            {author?.photoUrl ? (
              <img
                src={author.photoUrl}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              author?.name?.[0]?.toUpperCase() ?? "U"
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-[#e0e0f0]">
              {author?.name ?? "Unknown"}
            </p>
            <p className="text-xs text-[#3a3a52]">
              {getTimeAgo(post.createdAt)}
            </p>
          </div>
        </div>

        {community && (
          <span
            className="text-[11px] px-2.5 py-1 rounded-full bg-[#1e1e2e] border border-[#2a2a38] text-[#7c6fff] font-medium hover:cursor-pointer"
            onClick={() => navigate(`/home/community/${community._id}`)}
          >
            {community.name}
          </span>
        )}
      </div>

      {/* Content */}
      <p className="text-sm text-[#a0a0c0] leading-relaxed mb-4">
        {post.content}
      </p>

      {/* Image */}
      {post.image && (
        <div className="rounded-xl overflow-hidden mb-4 border border-[#2a2a38]">
          <img
            src={post.image}
            alt="post"
            className="w-full object-cover max-h-72"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 pt-3 border-t border-[#2a2a38]">
        {/* Like */}
        <button
          onClick={() => likePost(post._id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:bg-[#1e1e2e] ${
            isLiked ? "text-[#ff6b8a]" : "text-[#3a3a52] hover:text-[#ff6b8a]"
          }`}
        >
          <Heart size={14} className={isLiked ? "fill-[#ff6b8a]" : ""} />
          <span>{post.likes ?? 0}</span>
        </button>

        {/* Comment */}
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:bg-[#1e1e2e] ${
            showComments ? "text-[#7c6fff]" : "text-[#3a3a52] hover:text-[#7c6fff]"
          }`}
        >
          <MessageCircle size={14} />
          <span>{post.commentNumber ?? 0}</span>
        </button>

        {/* Share */}
        <div className="ml-auto">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#3a3a52] hover:text-[#4dd9ac] hover:bg-[#1e1e2e] transition-all">
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <CommentSection post={post} currentUserId={me?._id} />
      )}
    </div>
  );
};

export default PostCard;