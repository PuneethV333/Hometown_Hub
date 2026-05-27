/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Plus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetMe } from "../../../Hooks/useGetMe";
import { useGetSuggestedCommunities, useJoinLeaveCommunity } from "../../../Hooks/useCommunity";
import CreateCommunityModal from "./CreateCommunityModal";
import SidebarSkeleton from "../../../components/dashboard/Helpers/SidebarSkeleton";
import { CommunityCard } from "./CommunityCard";

const Communities = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const navigate = useNavigate();

  const { data: me, isPending: loadingMe } = useGetMe();
  const { data: suggested, isPending: loadingSuggested } = useGetSuggestedCommunities();
  const { mutate: joinLeave, isPending: isJoining } = useJoinLeaveCommunity();

  const myCommunities = me?.myCommunities ?? [];
  const suggestedCommunities = suggested?.data ?? [];

  return (
    <>
      <div className="min-h-full bg-[#0d0d12] p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-[#7c6fff]" />
              <h1 className="text-lg font-bold text-[#e0e0f0]">Communities</h1>
            </div>
            <button
              onClick={() => setOpenCreate(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2d1f5e] border border-violet-600/30 text-[#c4b5fd] hover:bg-[#3a2970] transition-all text-sm font-medium"
            >
              <Plus size={15} />
              Create Community
            </button>
          </div>

          
          <div>
            <h2 className="text-xs font-semibold text-[#7b7a9a] uppercase tracking-wider mb-3">
              My Communities ({myCommunities.length})
            </h2>

            {loadingMe ? (
              <SidebarSkeleton rows={3} />
            ) : myCommunities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2 rounded-2xl border border-[#2a2a38] bg-[#13131a]">
                <Users size={28} className="text-[#3a3a52]" />
                <p className="text-sm text-[#6a6a8a]">No communities joined yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {myCommunities.map((community: any) => (
                  <CommunityCard
                    key={community._id}
                    community={community}
                    isMember
                    onClick={() => navigate(`/home/communities/${community._id}`)}
                  />
                ))}
              </div>
            )}
          </div>

          
          <div>
            <h2 className="text-xs font-semibold text-[#7b7a9a] uppercase tracking-wider mb-3">
              Suggested for you
            </h2>

            {loadingSuggested ? (
              <SidebarSkeleton rows={3} />
            ) : suggestedCommunities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2 rounded-2xl border border-[#2a2a38] bg-[#13131a]">
                <p className="text-sm text-[#6a6a8a]">No suggestions available</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {suggestedCommunities.map((community: any) => (
                  <CommunityCard
                    key={community._id}
                    community={community}
                    isMember={false}
                    onJoin={() => joinLeave(community._id)}
                    isJoining={isJoining}
                    onClick={() => navigate(`/home/community/${community._id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateCommunityModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </>
  );
};


export default Communities;