/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useLikePost } from "../../../Hooks/usePost";

interface PostCardProps {
  post: any;
}

const getTimeAgo = (dateStr: string) => {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const PostCard = ({ post }: PostCardProps) => {
  const author = post.userId;
  const community = post.communityId;
  const { mutate: likePost } = useLikePost();

  return (
    <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-5 hover:border-[#3a3a52] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1e1e2e] border border-[#2a2a38] flex items-center justify-center text-xs font-semibold text-[#7c6fff] overflow-hidden shrink-0">
            {author?.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              (author?.name?.[0]?.toUpperCase() ?? "U")
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
          <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#1e1e2e] border border-[#2a2a38] text-[#7c6fff] font-medium">
            {community.name}
          </span>
        )}
      </div>

      <p className="text-sm text-[#a0a0c0] leading-relaxed mb-4">
        {post.content}
      </p>

      {post.image && (
        <div className="rounded-xl overflow-hidden mb-4 border border-[#2a2a38]">
          <img
            src={post.image}
            alt="post"
            className="w-full object-cover max-h-72"
          />
        </div>
      )}

      <div className="flex items-center gap-1 pt-3 border-t border-[#2a2a38]">
        <ActionButton
          icon={<Heart size={14} />}
          count={post.likes ?? 0}
          hoverColor="hover:text-[#ff6b8a]"
          onClick={() => likePost(post._id)}
        />
        <ActionButton
          icon={<MessageCircle size={14} />}
          count={post.commentNumber ?? 0}
          hoverColor="hover:text-[#7c6fff]"
        />
        <div className="ml-auto">
          <ActionButton
            icon={<Share2 size={14} />}
            label="Share"
            hoverColor="hover:text-[#4dd9ac]"
          />
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({
  icon,
  count,
  label,
  hoverColor,
  onClick,
}: {
  icon: React.ReactNode;
  count?: number;
  label?: string;
  hoverColor: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#3a3a52] ${hoverColor} hover:bg-[#1e1e2e] transition-all`}
  >
    {icon}
    {count !== undefined && <span>{count}</span>}
    {label && <span>{label}</span>}
  </button>
);

export default PostCard;
