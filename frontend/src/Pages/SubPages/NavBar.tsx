import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useGetMe } from "../../Hooks/useGetMe";
import { logout } from "../../services/auth.services";

const getInitials = (name?: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const NavBar = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: user } = useGetMe();

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (!res) toast.error("Logout failed");
      else {
        toast.success("Logged out successfully");
        navigate("/login");
      }
    } catch {
      toast.error("Failed to logout");
    }
  };

  //todo add reach feature
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <div className="h-16 px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search communities, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1a1a24] border border-[#2a2a38] rounded-lg px-4 py-2 pr-10 text-sm text-[#f0eeff] placeholder:text-[#4a4a62] outline-none focus:border-violet-600 transition-colors"
          />
          <Search
            size={15}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7b7a9a]"
          />
        </form>
      </div>

      <div className="flex items-center gap-4 ml-6">
        {/* Notification bell */}
        <button className="relative p-2 text-[#7b7a9a] hover:text-[#f0eeff] hover:bg-[#1a1a24] rounded-lg transition-all">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full" />
        </button>

        <div className="w-px h-6 bg-[#2a2a38]" />

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-[#1a1a24] transition-all"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-600 to-violet-800 flex items-center justify-center text-xs font-semibold text-white border border-[#2a2a38] overflow-hidden shrink-0">
              {user?.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={user.name ?? "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(user?.name)
              )}
            </div>

            {/* Name + role */}
            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium text-[#f0eeff] leading-none">
                {user?.name ?? "User"}
              </p>
              <p className="text-[10px] text-[#7b7a9a] leading-none mt-1">
                {user?.role ?? "Member"}
              </p>
            </div>

            <ChevronDown
              size={14}
              className={`text-[#7b7a9a] transition-transform duration-200 ${
                isProfileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#13131a] border border-[#2a2a38] rounded-xl shadow-xl z-50 overflow-hidden">
              {/* User info */}
              <div className="px-4 py-3 border-b border-[#2a2a38]">
                <p className="text-sm font-medium text-[#f0eeff] truncate">
                  {user?.name ?? "User"}
                </p>
                <p className="text-xs text-[#7b7a9a] truncate">{user?.email}</p>
              </div>

              {/* Menu items */}
              <div className="py-1.5">
                <DropdownItem
                  icon={<User size={14} />}
                  label="My Profile"
                  onClick={() => {
                    navigate("/home/profile");
                    setIsProfileMenuOpen(false);
                  }}
                />
                <DropdownItem
                  icon={<Settings size={14} />}
                  label="Settings"
                  onClick={() => {
                    navigate("/home/settings");
                    setIsProfileMenuOpen(false);
                  }}
                />
              </div>

              <div className="py-1.5 border-t border-[#2a2a38]">
                <DropdownItem
                  icon={<LogOut size={14} />}
                  label="Logout"
                  danger
                  onClick={() => {
                    handleLogout();
                    setIsProfileMenuOpen(false);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DropdownItem = ({
  icon,
  label,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors text-left hover:bg-[#1a1a24] ${
      danger ? "text-red-400" : "text-[#f0eeff]"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default NavBar;