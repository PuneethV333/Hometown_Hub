import {
  Users,
  Building2,
  FileText,
  CalendarDays,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useGetAdminData } from "../../../Hooks/useGetMe";


const AdminDashboard = () => {
  const { data, isPending, isError } = useGetAdminData();

  if (isPending) return <AdminSkeleton />;

  if (isError) return (
    <div className="flex items-center justify-center min-h-full">
      <p className="text-sm text-[#4a4a62]">Failed to load admin data</p>
    </div>
  );

  return (
    <div className="min-h-full bg-[#0d0d12] p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-[#e0e0f0]">Admin Dashboard</h1>
          <p className="text-xs text-[#3a3a52] mt-1">Platform overview and key metrics</p>
        </div>

        {/* Main KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <KpiCard
            title="Total Users"
            value={data?.totalUsers ?? 0}
            icon={<Users size={18} />}
            color="violet"
          />
          <KpiCard
            title="Communities"
            value={data?.totalCommunities ?? 0}
            icon={<Building2 size={18} />}
            color="indigo"
          />
          <KpiCard
            title="Total Posts"
            value={data?.totalPosts ?? 0}
            icon={<FileText size={18} />}
            color="purple"
          />
        </div>

        {/* Events breakdown */}
        <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <CalendarDays size={16} className="text-[#7c6fff]" />
            <h2 className="text-sm font-semibold text-[#e0e0f0]">Events Overview</h2>
            <span className="ml-auto text-xs px-2.5 py-1 rounded-full bg-[#1e1e2e] border border-[#2a2a38] text-[#7c6fff]">
              {data?.events?.total ?? 0} total
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <EventStatCard
              label="Upcoming"
              value={data?.events?.upcoming ?? 0}
              icon={<TrendingUp size={14} />}
              color="text-[#7c6fff]"
              bg="bg-[#1e1a2e]"
              border="border-[#3a2a5e]"
            />
            <EventStatCard
              label="Ongoing"
              value={data?.events?.ongoing ?? 0}
              icon={<Clock size={14} />}
              color="text-green-400"
              bg="bg-[#1a2e1e]"
              border="border-[#2a5e3a]"
            />
            <EventStatCard
              label="Past"
              value={data?.events?.past ?? 0}
              icon={<CheckCircle size={14} />}
              color="text-[#6a6a8a]"
              bg="bg-[#1e1e2e]"
              border="border-[#2a2a38]"
            />
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-5">
            <p className="text-xs text-[#3a3a52] mb-1">Avg posts per community</p>
            <p className="text-2xl font-bold text-[#e0e0f0]">
              {data?.totalCommunities
                ? (data.totalPosts / data.totalCommunities).toFixed(1)
                : 0}
            </p>
            <p className="text-xs text-[#7c6fff] mt-1">posts / community</p>
          </div>

          <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-5">
            <p className="text-xs text-[#3a3a52] mb-1">Avg members per community</p>
            <p className="text-2xl font-bold text-[#e0e0f0]">
              {data?.totalCommunities
                ? (data.totalUsers / data.totalCommunities).toFixed(1)
                : 0}
            </p>
            <p className="text-xs text-[#7c6fff] mt-1">users / community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const KpiCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "violet" | "indigo" | "purple";
}) => {
  const colors = {
    violet: { bg: "bg-[#1e1a2e]", border: "border-[#3a2a5e]", text: "text-[#7c6fff]", icon: "bg-[#2d1f5e]" },
    indigo: { bg: "bg-[#1a1a2e]", border: "border-[#2a2a5e]", text: "text-indigo-400", icon: "bg-[#1f1f5e]" },
    purple: { bg: "bg-[#1e1a2e]", border: "border-[#3a2a5e]", text: "text-purple-400", icon: "bg-[#2d1f5e]" },
  };

  const c = colors[color];

  return (
    <div className={`${c.bg} border ${c.border} rounded-2xl p-5`}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-[#6a6a8a] font-medium">{title}</p>
        <div className={`${c.icon} p-2 rounded-lg ${c.text}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-[#e0e0f0]">
        {value.toLocaleString()}
      </p>
    </div>
  );
};

const EventStatCard = ({
  label,
  value,
  icon,
  color,
  bg,
  border,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
}) => (
  <div className={`${bg} border ${border} rounded-xl p-4 text-center`}>
    <div className={`flex items-center justify-center gap-1.5 ${color} mb-2`}>
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </div>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

const AdminSkeleton = () => (
  <div className="min-h-full bg-[#0d0d12] p-6">
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="w-48 h-6 rounded-lg bg-[#1e1e2e] animate-pulse" />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-[#13131a] border border-[#2a2a38] animate-pulse" />
        ))}
      </div>
      <div className="h-48 rounded-2xl bg-[#13131a] border border-[#2a2a38] animate-pulse" />
      <div className="grid grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-[#13131a] border border-[#2a2a38] animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

export default AdminDashboard;