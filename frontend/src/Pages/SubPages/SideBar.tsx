import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  CalendarDays,
  Users,
  User,
  ChevronDown,
  ChevronRight,
  Plus,
  Compass,
} from "lucide-react";

export interface Community {
  _id: string;
  name: string;
  icon?: string;
  memberCount?: number;
}

export interface SideBarProps {
  user?: {
    name?: string;
    photoUrl?: string;
    myCommunities?: Community[];
  };
}

const navItems = [
  { name: "Home", path: "/home", icon: Home },
  { name: "Events", path: "/home/events", icon: CalendarDays },
  { name: "Communities", path: "/home/communities", icon: Users },
  { name: "Profile", path: "/home/profile", icon: User },
];

const getAccent = (name?: string) => {
  const accents = [
    "from-violet-600 to-violet-800",
    "from-indigo-500 to-violet-700",
    "from-purple-600 to-indigo-700",
    "from-violet-700 to-purple-900",
  ];

  if (!name || name.length === 0) {
    return accents[0];
  }

  return accents[name.charCodeAt(0) % accents.length];
};

const SideBar = ({ user }: SideBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [expandCommunities, setExpandCommunities] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  // populated communities directly
  const communities = user?.myCommunities ?? [];

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-[#2a2a38]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1a1230] border border-[#2a2a38] flex items-center justify-center shrink-0">
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

          <span className="text-sm font-bold text-[#f0eeff]">Hometown Hub</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto scrollbar-none">
        <div className="space-y-1 mb-8">
          {navItems.map(({ name, path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-150 ${
                isActive(path)
                  ? "bg-[#2d1f5e] text-[#c4b5fd] border border-violet-600/30"
                  : "text-[#7b7a9a] hover:text-[#f0eeff] hover:bg-[#1a1a24]"
              }`}
            >
              <Icon size={17} />

              <span className="text-sm font-medium">{name}</span>
            </button>
          ))}
        </div>

        {/* Communities */}
        <div className="border-t border-[#2a2a38] pt-4">
          <button
            onClick={() => setExpandCommunities((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2 text-[#7b7a9a] hover:text-[#f0eeff] transition-colors mb-2"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              My Communities ({communities.length})
            </span>

            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${
                expandCommunities ? "rotate-0" : "-rotate-90"
              }`}
            />
          </button>

          {expandCommunities && (
            <div className="space-y-0.5">
              {communities.length > 0 ? (
                communities.map((community) => (
                  <button
                    key={community._id}
                    onClick={() =>
                      navigate(`/home/communities/${community._id}`)
                    }
                    className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-[#7b7a9a] hover:text-[#f0eeff] hover:bg-[#1a1a24] transition-all group"
                  >
                    {/* community icon */}
                    <div className="w-6 h-6 rounded-md overflow-hidden shrink-0">
                      {community.icon ? (
                        <img
                          src={community.icon}
                          alt={community.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-linear-to-br ${getAccent(
                            community.name,
                          )} flex items-center justify-center text-[10px] font-bold text-white`}
                        >
                          {community.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* info */}
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium text-[#f0eeff] truncate group-hover:text-violet-400 transition-colors">
                        {community.name}
                      </p>

                      {community.memberCount ? (
                        <p className="text-[10px] text-[#4a4a62]">
                          {community.memberCount.toLocaleString()} members
                        </p>
                      ) : null}
                    </div>

                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[#7b7a9a]"
                    />
                  </button>
                ))
              ) : (
                <div className="px-4 py-4 text-center">
                  <p className="text-xs text-[#4a4a62] mb-2">
                    No communities joined yet
                  </p>

                  <button
                    onClick={() => navigate("/home/communities")}
                    className="text-xs text-violet-400 hover:text-violet-300 font-medium transition-colors"
                  >
                    Browse Communities →
                  </button>
                </div>
              )}

              {/* Join button */}
              <button
                onClick={() => navigate("/home/communities")}
                className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#2d1f5e] border border-violet-600/30 text-[#c4b5fd] hover:bg-[#3a2970] transition-all text-sm font-medium"
              >
                <Plus size={15} />
                Join Community
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#2a2a38]">
        <div className="bg-[#1a1a24] rounded-xl p-3 border border-[#2a2a38]">
          <p className="text-xs text-[#7b7a9a] mb-2.5 leading-relaxed">
            Discover communities and connect with your hometown.
          </p>

          <button
            onClick={() => navigate("/home/communities")}
            className="w-full flex items-center justify-center gap-1.5 text-xs bg-linear-to-r from-violet-600 to-violet-800 text-white py-2 rounded-lg hover:opacity-90 transition-all font-medium"
          >
            <Compass size={13} />
            Explore Communities
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
