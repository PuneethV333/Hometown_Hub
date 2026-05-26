/* eslint-disable @typescript-eslint/no-explicit-any */

import { MapPin, Calendar, Shield, Edit3 } from "lucide-react";
import { useGetMe } from "../../../Hooks/useGetMe";
import { useGetUserPost } from "../../../Hooks/usePost";
import FeedSkeleton from "../../../components/dashboard/Helpers/FeedSkeleton";
import PostCard from "../../../components/dashboard/Helpers/PostCard";

const ProfilePage = () => {
  const { data: me, isPending: loadingMe } = useGetMe();
  const { data, isPending: loadingPosts } = useGetUserPost();

  const posts = data?.data ?? [];

  if (loadingMe)
    return (
      <div className="min-h-full bg-[#0d0d12] p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-48 rounded-2xl bg-[#13131a] border border-[#2a2a38] animate-pulse" />
          <FeedSkeleton />
        </div>
      </div>
    );

  return (
    <div className="min-h-full bg-[#0d0d12] p-6">
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl overflow-hidden">
          <div className="h-24 bg-linear-to-r from-[#1e1a2e] to-[#2d1f5e]" />

          <div className="px-5 pb-5">
            <div className="flex items-end justify-between -mt-8 mb-4">
              <div className="w-16 h-16 rounded-xl border-2 border-[#0d0d12] overflow-hidden bg-[#1e1e2e] flex items-center justify-center text-xl font-bold text-[#7c6fff]">
                {me?.photoUrl ? (
                  <img
                    src={me.photoUrl}
                    alt={me.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (me?.name?.[0]?.toUpperCase() ?? "U")
                )}
              </div>

              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e1e2e] border border-[#2a2a38] text-[#7b7a9a] hover:text-[#f0eeff] hover:border-[#3a3a52] transition-all text-sm">
                <Edit3 size={14} />
                Edit Profile
              </button>
            </div>

            <h1 className="text-lg font-bold text-[#e0e0f0] mb-1">
              {me?.name ?? "Unknown"}
            </h1>

            <div className="flex items-center flex-wrap gap-3 mt-2">
              <span
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium border ${
                  me?.role === "Admin"
                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                    : me?.role === "Moderator"
                      ? "bg-violet-500/10 text-violet-400 border-violet-500/20"
                      : "bg-[#1e1e2e] text-[#7b7a9a] border-[#2a2a38]"
                }`}
              >
                <Shield size={10} />
                {me?.role}
              </span>

              {(me?.city || me?.state) && (
                <div className="flex items-center gap-1 text-xs text-[#3a3a52]">
                  <MapPin size={11} />
                  <span>
                    {[me?.city, me?.state].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}

              {me?.dob && (
                <div className="flex items-center gap-1 text-xs text-[#3a3a52]">
                  <Calendar size={11} />
                  <span>
                    {new Date(me.dob).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-[#2a2a38]">
              <div className="text-center">
                <p className="text-sm font-bold text-[#e0e0f0]">
                  {posts.length}
                </p>
                <p className="text-xs text-[#3a3a52]">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-[#e0e0f0]">
                  {me?.myCommunities?.length ?? 0}
                </p>
                <p className="text-xs text-[#3a3a52]">Communities</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-[#e0e0f0]">
                  {posts.reduce(
                    (acc: number, p: any) => acc + (p.likes ?? 0),
                    0,
                  )}
                </p>
                <p className="text-xs text-[#3a3a52]">Total likes</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#7b7a9a] uppercase tracking-wider mb-4">
            Posts
          </h2>

          {loadingPosts ? (
            <FeedSkeleton />
          ) : posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-2xl border border-[#2a2a38] bg-[#13131a]">
              <span className="text-3xl">📝</span>
              <p className="text-sm font-medium text-[#6a6a8a]">No posts yet</p>
              <p className="text-xs text-[#3a3a52]">
                Your posts will appear here
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {posts.map((post: any) => (
                <PostCard key={post._id} post={post}  />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
