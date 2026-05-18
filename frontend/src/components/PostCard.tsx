/* eslint-disable @typescript-eslint/no-explicit-any */
// import HeartIcon from "../icons/HeartIcon";
// import CommentIcon from "../icons/CommentIcon";
// import ShareIcon from "../icons/ShareIcon";
// import { getTimeAgo } from "../../utils/timeAgo";

import { getTimeAgo } from "../utils/Timeago";
import CommentIcon from "./icons/Commenticon";
import HeartIcon from "./icons/Hearticon";
import ShareIcon from "./icons/ShareIcon";

const PostCard = ({ post }: { post: any }) => {
  const author = post.userId;
  const community = post.communityId;
  const timeAgo = getTimeAgo(post.createdAt);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#EBEBEB] hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#E8E4FF] flex items-center justify-center text-sm font-semibold text-[#5B4FCF] overflow-hidden flex-shrink-0">
            {author?.avatar ? (
              <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
            ) : (
              author?.name?.[0]?.toUpperCase() ?? "U"
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1A1A1A]">{author?.name ?? "Unknown"}</p>
            <p className="text-xs text-[#9B9B9B]">{timeAgo}</p>
          </div>
        </div>
        {community && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#F0EDFF] text-[#5B4FCF] font-medium">
            {community.name}
          </span>
        )}
      </div>

      {/* Content */}
      <p className="text-sm text-[#3A3A3A] leading-relaxed mb-3">{post.content}</p>

      {/* Image */}
      {post.image && (
        <div className="rounded-xl overflow-hidden mb-3">
          <img src={post.image} alt="post" className="w-full object-cover max-h-72" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-[#F0F0F0]">
        <button className="flex items-center gap-1.5 text-xs text-[#9B9B9B] hover:text-[#E85D75] transition-colors group">
          <HeartIcon className="group-hover:scale-110 transition-transform" />
          <span>{post.likes ?? 0}</span>
        </button>
        <button className="flex items-center gap-1.5 text-xs text-[#9B9B9B] hover:text-[#5B4FCF] transition-colors">
          <CommentIcon />
          <span>{post.commentNumber ?? 0}</span>
        </button>
        <button className="flex items-center gap-1.5 text-xs text-[#9B9B9B] hover:text-[#1A1A1A] transition-colors ml-auto">
          <ShareIcon />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;