import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetMe } from "../../Hooks/useGetMe";
import Spinner from "../../components/Spinner";
import { logout } from "../../services/auth.services";

const NavBar = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [`searchQuery`, setSearchQuery] = useState("");

  const { data: user, isPending } = useGetMe();

  if (isPending) {
    <Spinner />;
  }

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (!res) {
        toast.error("Logged out failed");
      }
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to logout");
      console.error(err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="h-16 px-6 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search communities, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a24] border border-[#2a2a38] rounded-lg px-4 py-2 text-sm text-[#f0eeff] placeholder:text-[#4a4a62] outline-none focus:border-violet-600 transition-colors"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7b7a9a]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <button className="relative p-2 text-[#7b7a9a] hover:text-[#f0eeff] hover:bg-[#1a1a24] rounded-lg transition-all">
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-violet-600 rounded-full"></span>
        </button>

        <div className="w-px h-6 bg-[#2a2a38]"></div>

        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-[#1a1a24] transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-600 to-violet-800 flex items-center justify-center text-xs font-semibold text-white border border-[#2a2a38]">
              {user?.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={user.name || "User"}
                  className="w-full h-full rounded-lg object-cover"
                />
              ) : (
                getInitials(user?.name)
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="text-left hidden sm:block">
                <p className="text-xs font-medium text-[#f0eeff] leading-none">
                  {user?.name || "User"}
                </p>
                <p className="text-[10px] text-[#7b7a9a] leading-none mt-1">
                  {user?.role || "User"}
                </p>
              </div>
              <svg
                className={`w-4 h-4 text-[#7b7a9a] transition-transform ${
                  isProfileMenuOpen ? "rotate-180" : ""
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
            </div>
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#13131a] border border-[#2a2a38] rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border-b border-[#2a2a38]">
                <p className="text-sm font-medium text-[#f0eeff]">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-[#7b7a9a]">{user?.email}</p>
              </div>

              <div className="py-2">
                <button
                  onClick={() => {
                    navigate("/home/profile");
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-[#f0eeff] hover:bg-[#1a1a24] transition-colors text-left flex items-center gap-3"
                >
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  My Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/home/settings");
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-[#f0eeff] hover:bg-[#1a1a24] transition-colors text-left flex items-center gap-3"
                >
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </button>
              </div>

              <div className="py-2 border-t border-[#2a2a38]">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-red-400 hover:bg-[#1a1a24] transition-colors text-left flex items-center gap-3"
                >
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
