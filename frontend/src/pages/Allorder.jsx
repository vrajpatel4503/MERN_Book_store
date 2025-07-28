import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaUser, FaCheck } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SeeuserData from "./SeeuserData"; // ✅ Import user detail modal
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";

const Allorder = () => {
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(-1);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [user, setUser] = useState("hidden");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/order/get-all-orders`,
          { withCredentials: true }
        );
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const updateStatus = async (orderId) => {
    const status = selectedStatuses[orderId];
    if (!status) {
      toast.warning("Please select a status");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8000/api/v1/order/update-status-of-order/${orderId}`,
        { status },
        { withCredentials: true }
      );

      showSuccessToast("Status updated successfully");

      const refreshed = await axios.get(
        `http://localhost:8000/api/v1/order/get-all-orders`,
        { withCredentials: true }
      );
      setData(refreshed.data.data);
      setOptions(-1);
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to update status");
    }
  };

  return (
    <>
      {!data ? (
        <div className="h-screen flex items-center justify-center bg-zinc-900">
          <Loader />
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-white mt-10">No orders found.</p>
      ) : (
        <div className="min-h-screen bg-zinc-900 p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-400 mb-8 mx-4">
            Your Order History
          </h1>

          <div className="overflow-x-auto mx-4">
            <table className="min-w-full bg-zinc-800 border border-gray-600 rounded-lg">
              <thead>
                <tr className="text-left border-b border-gray-600 text-zinc-300">
                  <th className="p-4">Title</th>
                  <th className="p-4">Seller</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4"><FaUser /></th>
                  <th className="p-4">View</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-700 hover:bg-zinc-700 transition"
                  >
                    <td className="p-4">
                      <Link
                        to={`/view-book-details/${item.book._id}`}
                        className="text-amber-400 hover:underline"
                      >
                        {item.book.bookTitle}
                      </Link>
                    </td>
                    <td className="p-4">{item.book.bookSeller}</td>
                    <td className="p-4">₹ {item.book.bookPrice}</td>
                    <td className="p-4 capitalize">
                      <button
                        className="hover:scale-105 transition-all duration-300 mb-2"
                        onClick={() => setOptions(i)}
                      >
                        {item.status === "Order placed" ? (
                          <span className="text-yellow-500">{item.status}</span>
                        ) : item.status === "Cancelled Order" ? (
                          <span className="text-red-500">{item.status}</span>
                        ) : (
                          <span className="text-green-500">{item.status}</span>
                        )}
                      </button>

                      {options === i && (
                        <div className="flex items-center gap-2 mt-2">
                          <select
                            name="status"
                            defaultValue=""
                            onChange={(e) =>
                              handleStatusChange(item._id, e.target.value)
                            }
                            className="bg-zinc-800 border border-zinc-600 rounded px-2 py-1 text-sm"
                          >
                            <option value="" disabled>
                              -- Select Status --
                            </option>
                            {[
                              "Order Placed",
                              "Out of delivery",
                              "Cancelled Order",
                              "Delivered",
                            ].map((status, idx) => (
                              <option value={status} key={idx}>
                                {status}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => {
                              setOptions(-1);
                              updateStatus(item._id);
                            }}
                            className="text-green-500 hover:text-amber-400 transition-colors duration-200 p-2 rounded"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="p-4">{item.user?.fullName || "N/A"}</td>
                    <td className="p-4">
                      <button
                        onClick={() => {
                          setUser("fixed");
                          setUserData(item.user);
                        }}
                        className="hover:text-amber-400"
                      >
                        <AiOutlineEye className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Show Modal */}
          {user !== "hidden" && userData && (
            <SeeuserData userData={userData} onClose={() => setUser("hidden")} />
          )}
        </div>
      )}
    </>
  );
};

export default Allorder;
