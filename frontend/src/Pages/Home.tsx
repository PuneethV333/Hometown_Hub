import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./SubPages/NavBar";
import SideBar from "./SubPages/SideBar";
import { useGetMe } from "../Hooks/useGetMe";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Home = () => {
  const { data, isPending } = useGetMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && !data.isProfileComplete) {
      toast("Complete onboarding!", {
        icon: "🙅",
      });

      navigate("/on-boarding");
    }
  }, [data, navigate]);

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen bg-[#0d0d12]">
      <aside className="w-64 border-r border-[#2a2a38] flex flex-col bg-[#0d0d12]">
        <SideBar />
      </aside>

      <div className="flex-1 flex flex-col">
        <nav className="border-b border-[#2a2a38] bg-[#13131a] sticky top-0 z-40">
          <NavBar />
        </nav>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
