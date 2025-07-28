import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const UserOrderHistory = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/order/get-orders-history`,
          { withCredentials: true }
        );
        setOrderData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderData();
  }, []);

  return (
    <>
      {/* Loader */}
      {!orderData && (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      )}

      {/* No orders */}
      {orderData && orderData.length === 0 && (
        <div className="min-h-screen p-4 text-zinc-100 flex items-center justify-center">
          <h1 className="text-2xl">No order history</h1>
        </div>
      )}

      {/* Orders Table */}
      {orderData && orderData.length > 0 && (
        <div className="min-h-screen p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-400 mb-8 mx-4">
            Your Order History
          </h1>

          <div className="overflow-x-auto mx-4">
            <table className="min-w-full bg-zinc-800 border border-gray-600 rounded-lg">
              <thead>
                <tr className="text-left border-b border-gray-600 text-zinc-300">
                  <th className="p-4">Book</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Seller</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-zinc-700"
                  >
                    <td className="p-4">
                      <img
                        src={order.book?.bookPhoto}
                        alt={order.book?.bookTitle || "Book cover"}
                        className="w-20 h-28 object-cover rounded bg-gray-700"
                      />
                    </td>
                    <td className="p-4">{order.book?.bookTitle || "Untitled"}</td>
                    <td className="p-4">{order.book?.bookAuthor || "Unknown"}</td>
                    <td className="p-4">{order.book?.bookSeller || "N/A"}</td>
                    <td className="p-4">₹ {order.book?.bookPrice || "N/A"}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          order.status === "Order Placed"
                            ? "bg-green-600 text-white"
                            : order.status === "Cancelled Order"
                            ? "bg-red-600 text-white"
                            : "bg-yellow-500 text-black"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
