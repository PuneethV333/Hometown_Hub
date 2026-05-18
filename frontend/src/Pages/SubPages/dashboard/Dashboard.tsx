import CommunitySuggestion from "../../../components/dashboard/CommunitySuggestion";
import Events from "../../../components/dashboard/Events";
import Feed from "../../../components/dashboard/Feed";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-4">
            <Feed />
          </div>

          <div className="space-y-4">
            <Events />
            <CommunitySuggestion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
