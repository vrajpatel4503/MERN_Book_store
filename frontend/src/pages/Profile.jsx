import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FiMenu } from "react-icons/fi"; // Hamburger icon
import { IoClose } from "react-icons/io5"; // Close icon

const Profile = () => {
  const [data, setData] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile toggle

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/user/get-user-details",
          { withCredentials: true }
        );
        setData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  if (!data) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex bg-zinc-900 text-white min-h-screen relative">
      
      {/* Desktop */}
      <div className="hidden md:block w-1/6">
        <div className="fixed top-0 mt-15 left-0 h-[90vh] w-1/6 bg-zinc-900 border-r border-gray-700 p-4 z-20">
          <Sidebar data={data} />
        </div>
      </div>

      {/* Mobile Sidebar (Slide In) */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-zinc-900 border-r border-gray-700 p-4 z-30 transition duration-300 ease-in-out">
          <div className="flex justify-end mb-4">
            <button onClick={() => setIsSidebarOpen(false)} className="text-white text-2xl">
              <IoClose />
            </button>
          </div>
          <Sidebar data={data} />
        </div>
      )}

      {/* Toggle button for mobile */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 text-white text-2xl bg-zinc-700 p-2 rounded"
      >
        <FiMenu />
      </button>

      {/* Main Content */}
      <div className="w-full flex flex-col min-h-screen">
        <main className="flex-grow px-4 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Profile;
