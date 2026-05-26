/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Send } from "lucide-react";
import { useAddComment } from "../../../Hooks/usePost";

interface CommentSectionProps {
  post: any;
  currentUserId?: string;
}

const getTimeAgo = (dateStr: string) => {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const CommentSection = ({ post, currentUserId }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const { mutate: addComment, isPending } = useAddComment();

  const comments = post.comments ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(
      { postId: post._id, content: commentText },
      {
        onSuccess: () => setCommentText(""),
      },
    );
  };

  return (
    <div className="mt-4 pt-4 border-t border-[#2a2a38] space-y-3">
      {comments.length === 0 ? (
        <p className="text-xs text-[#3a3a52] text-center py-2">
          No comments yet. Be the first!
        </p>
      ) : (
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {comments.map((comment: any) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 bg-[#0d0d12] border border-[#2a2a38] rounded-xl px-3 py-2 text-xs text-[#e0e0f0] placeholder:text-[#3a3a52] outline-none focus:border-[#7c6fff] transition-colors"
        />
        <button
          type="submit"
          disabled={isPending || !commentText.trim()}
          className="p-2 rounded-xl bg-[#2d1f5e] text-[#7c6fff] hover:bg-[#3a2970] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {isPending ? (
            <div className="w-4 h-4 border-2 border-[#7c6fff] border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send size={14} />
          )}
        </button>
      </form>
    </div>
  );
};

const CommentItem = ({
  comment,
  currentUserId,
}: {
  comment: any;
  currentUserId?: string;
}) => {
  const author = comment.by;
  const isOwn = author?._id === currentUserId;

  return (
    <div
      className={`flex items-start gap-2.5 ${isOwn ? "flex-row-reverse" : ""}`}
    >
      <div className="w-7 h-7 rounded-full bg-[#1e1e2e] border border-[#2a2a38] flex items-center justify-center text-[10px] font-semibold text-[#7c6fff] overflow-hidden shrink-0">
        {author?.photoUrl ? (
          <img
            src={author.photoUrl}
            alt={author.name}
            className="w-full h-full object-cover"
          />
        ) : (
          (author?.name?.[0]?.toUpperCase() ?? "U")
        )}
      </div>

      <div
        className={`flex-1 max-w-[80%] rounded-xl px-3 py-2 border ${
          isOwn
            ? "bg-[#2d1f5e] border-violet-600/30"
            : "bg-[#0d0d12] border-[#2a2a38]"
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <p className="text-[11px] font-semibold text-[#c0c0e0]">
            {isOwn ? "You" : (author?.name ?? "Unknown")}
          </p>
          <p className="text-[10px] text-[#3a3a52]">
            {getTimeAgo(comment.createdAt)}
          </p>
        </div>
        <p className="text-xs text-[#a0a0c0] leading-relaxed">
          {comment.content}
        </p>
      </div>
    </div>
  );
};

export default CommentSection;
