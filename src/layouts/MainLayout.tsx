import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { JSX } from "react";

const MainLayout = (): JSX.Element => {
  return (
    <div className='flex h-screen bg-black text-white'>
      <Sidebar />
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
