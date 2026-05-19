import CommunitySuggestion from "../../../components/dashboard/CommunitySuggestion";
import Events from "../../../components/dashboard/Events";
import Feed from "../../../components/dashboard/Feed";

const Dashboard = () => {
  return (
    <div className="min-h-full bg-[#0d0d12] px-6 pl-6 ">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
          <Feed />

          <div className="flex flex-col gap-4">
            <Events />
            <CommunitySuggestion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
