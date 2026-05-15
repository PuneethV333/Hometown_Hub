import { Outlet } from "react-router-dom";
import NavBar from "./SubPages/NavBar";
import SideBar from "./SubPages/SideBar";

const Home = () => {
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
