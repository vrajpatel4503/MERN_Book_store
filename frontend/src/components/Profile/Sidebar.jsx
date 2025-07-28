import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessToast } from "../../utils/toastUtils";
import { persistor } from "../../store/store.js";
import { authActions } from "../../store/authSlice.js";

const Sidebar = ({ data = {} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/logout",
        {},
        { withCredentials: true }
      );

      dispatch(authActions.logout());

      showSuccessToast(res.data.message || "Logout successfully");

      // Navigate first
      navigate("/");

      // Then purge store after navigation
      setTimeout(() => {
        persistor.purge();
      }, 100);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center w-full h-full">
      <div className="flex flex-col items-center w-full">
        <img
          src={data.avatar}
          alt="User Avatar"
          className="h-[14vh] w-[14vh] rounded-full object-cover"
        />
        <p className="mt-4 text-xl text-zinc-100 font-semibold text-center">
          {data.userName || "User Name"}
        </p>
        <p className="mt-1 text-zinc-400 text-sm text-center break-all">
          {data.email || "user@example.com"}
        </p>

        {role === "user" ? (
          <div>
            <div className="w-full mt-6 border-t border-zinc-600 pt-4 flex flex-col gap-2">
              <Link
                to="/profile"
                className="text-zinc-100 font-medium py-2 px-4 text-center hover:bg-amber-300 rounded transition-all duration-300"
              >
                Favourites
              </Link>
              <Link
                to="/profile/order-history"
                className="text-zinc-100 font-medium py-2 px-4 text-center hover:bg-amber-300 rounded transition-all duration-300"
              >
                Order History
              </Link>
              <Link
                to="/profile/Setting"
                className="text-zinc-100 font-medium py-2 px-4 text-center hover:bg-amber-300 rounded transition-all duration-300"
              >
                Settings
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="w-full mt-6 border-t border-zinc-600 pt-4 flex flex-col gap-2">
              <Link
                to="/profile/all-order"
                className="text-zinc-100 font-medium py-2 px-4 text-center hover:bg-amber-300 rounded transition-all duration-300"
              >
                All Order
              </Link>
              <Link
                to="/profile/add-book"
                className="text-zinc-100 font-medium py-2 px-4 text-center hover:bg-amber-300 rounded transition-all duration-300"
              >
                Add Book
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto w-full">
        <button
          onClick={handleLogout}
          className="w-full mt-6 border text-zinc-100 border-zinc-600 p-3 text-lg flex items-center justify-center rounded hover:bg-amber-400 transition-all duration-300"
        >
          Logout
          <span className="ml-2 text-xl">
            <RiLogoutBoxRLine />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
