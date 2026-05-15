import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Community {
  _id: string;
  name: string;
  image?: string;
  memberCount?: number;
}

interface SideBarProps {
  user?: {
    name?: string;
    photoUrl?: string;
    myCommunities?: Array<{ communityId: Community | string }>;
  };
}

const SideBar = ({ user }: SideBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandCommunities, setExpandCommunities] = useState(true);

  const navItems = [
    {
      name: "Home",
      path: "/home",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 16l-7-4m0 0V9m7 4l7-4"
          />
        </svg>
      ),
    },
    {
      name: "Events",
      path: "/home/events",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "Communities",
      path: "/home/communities",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3.414a2 2 0 01-2-2v-7.28a2 2 0 012-2h13.172a2 2 0 012 2v7.28a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      name: "Profile",
      path: "/home/profile",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  
  const communities = user?.myCommunities
    ? user.myCommunities.map((item) => {
        const community =
          typeof item.communityId === "string"
            ? null
            : (item.communityId as Community);
        return community;
      })
    : [];

  const filteredCommunities = communities.filter(
    (c): c is Community => c !== null,
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-[#2a2a38]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1a1230] border border-[#2a2a38] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
              <rect x="1" y="1" width="9" height="9" rx="2" fill="#a78bfa" />
              <rect
                x="12"
                y="1"
                width="9"
                height="9"
                rx="2"
                fill="#7c3aed"
                opacity="0.6"
              />
              <rect
                x="1"
                y="12"
                width="9"
                height="9"
                rx="2"
                fill="#7c3aed"
                opacity="0.6"
              />
              <rect x="12" y="12" width="9" height="9" rx="2" fill="#a78bfa" />
            </svg>
          </div>
          <span className="text-sm font-bold text-[#f0eeff]">Hometown-Hub</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="space-y-1 mb-8">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-150 ${
                isActive(item.path)
                  ? "bg-[#2d1f5e] text-[#c4b5fd] border border-violet-600/30"
                  : "text-[#7b7a9a] hover:text-[#f0eeff] hover:bg-[#1a1a24]"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-[#2a2a38] pt-4">
          <button
            onClick={() => setExpandCommunities(!expandCommunities)}
            className="w-full flex items-center justify-between px-4 py-2 text-[#7b7a9a] hover:text-[#f0eeff] transition-colors mb-3"
          >
            <span className="text-xs font-semibold uppercase tracking-wider">
              My Communities ({filteredCommunities.length})
            </span>
            <svg
              className={`w-4 h-4 transition-transform ${
                expandCommunities ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {expandCommunities && (
            <div className="space-y-1">
              {filteredCommunities.length > 0 ? (
                filteredCommunities.map((community) => (
                  <button
                    key={community._id}
                    onClick={() =>
                      navigate(`/home/communities/${community._id}`)
                    }
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[#7b7a9a] hover:text-[#f0eeff] hover:bg-[#1a1a24] transition-all group"
                  >
                    {community.image ? (
                      <img
                        src={community.image}
                        alt={community.name}
                        className="w-6 h-6 rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-md bg-linear-to-br from-violet-600 to-violet-800 flex items-center justify-center text-xs font-semibold text-white">
                        {community.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium text-[#f0eeff] truncate group-hover:text-violet-400">
                        {community.name}
                      </p>
                      {community.memberCount && (
                        <p className="text-[10px] text-[#4a4a62]">
                          {community.memberCount} members
                        </p>
                      )}
                    </div>

                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-center">
                  <p className="text-xs text-[#4a4a62] mb-2">
                    You haven't joined any communities yet
                  </p>
                  <button
                    onClick={() => navigate("/home/communities")}
                    className="text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors"
                  >
                    Browse Communities →
                  </button>
                </div>
              )}
            </div>
          )}

          <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2d1f5e] border border-violet-600/30 text-[#c4b5fd] hover:bg-[#3a2970] transition-all text-sm font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Join Community
          </button>
        </div>
      </nav>

      <div className="p-4 border-t border-[#2a2a38]">
        <div className="bg-[#1a1a24] rounded-lg p-3 border border-[#2a2a38]">
          <p className="text-xs text-[#7b7a9a] mb-2">
            Discover more communities and connect with your hometown.
          </p>
          <button
            onClick={() => navigate("/home/communities")}
            className="w-full text-xs bg-linear-to-r from-violet-600 to-violet-800 text-white py-1.5 rounded-md hover:opacity-90 transition-all font-medium"
          >
            Explore Communities
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
