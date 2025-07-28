import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const Cart = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart books on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/cart/get-all-book-from-cart`,
          { withCredentials: true }
        );
        setData(res.data.data);
      } catch (error) {
        console.log("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Recalculate total whenever cart data changes
  useEffect(() => {
    let total = 0;
    data.forEach((item) => {
      total += Number(item.bookPrice);
    });
    setTotal(total);
  }, [data]);

  // Remove from cart handler
  const handleRemoveFromCart = async (bookId) => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/cart/remove-from-cart/${bookId}`,
        {},
        { withCredentials: true }
      );
      setData((prev) => prev.filter((book) => book._id !== bookId));
    } catch (error) {
      console.log("Error removing book:", error);
    }
  };

  // Place order
  const handlePlaceOrder = async () => {
    try {
      const orderPayload = data.map((book) => ({
        bookId: book._id,
      }));

      const res = await axios.post(
        `http://localhost:8000/api/v1/order/place-order`,
        { order: orderPayload },
        { withCredentials: true }
      );

      if (res.data.message) {
        setData([]);
        setTotal(0);
      }

      showSuccessToast(res.data.message || "Order placed successfully");

      setTimeout(() => {
        navigate("/profile/order-history");
      }, 1000);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col md:flex-row p-6 gap-6">
      {/* Left: Cart Items */}
      <div className="md:w-3/4 w-full">
        <h2 className="text-3xl font-bold text-white mb-6">Your Cart</h2>

        {loading ? (
          <div className="w-full h-[100%] flex justify-center items-center">
            <Loader />
          </div>
        ) : data.length === 0 ? (
          <div className="flex justify-center items-center h-[60vh]">
            <p className="text-gray-400 text-5xl text-center">Empty cart.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((book) => (
              <div
                key={book._id}
                className="bg-zinc-900 border border-gray-700 rounded-xl p-4 flex flex-col md:flex-row gap-6 shadow-lg"
              >
                <div className="md:w-1/4">
                  <img
                    src={book.bookPhoto}
                    alt={book.bookTitle || "Book cover"}
                    className="w-36 h-52 object-cover rounded-lg bg-gray-800"
                  />
                </div>

                <div className="md:w-2/4 text-gray-100">
                  <h3 className="text-xl font-semibold mb-1">
                    {book.bookTitle || "Untitled Book"}
                  </h3>
                  <p className="text-sm mb-1 text-gray-400">
                    Author: {book.bookAuthor || "Unknown"}
                  </p>
                  <p className="text-lg mb-1 font-medium text-amber-400">
                    ₹ {book.bookPrice || "N/A"}
                  </p>
                  <p className="text-sm mt-2">
                    {book.bookDescription || "No description available."}
                  </p>
                </div>

                <div className="ml-auto flex items-start gap-4">
                  <button
                    className="border rounded-full p-2 hover:bg-red-600"
                    onClick={() => handleRemoveFromCart(book._id)}
                  >
                    <AiFillDelete className="text-2xl text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: Place Order */}
      <div className="md:w-1/4 w-full bg-zinc-800 rounded-lg p-6 h-fit">
        <h3 className="text-white text-2xl lg:text-4xl text-center font-bold mb-4">
          Place Order
        </h3>
        <p className="text-white lg:text-2xl mb-2 mt-4">
          Total Items: <span className="text-white">{data.length}</span>
        </p>
        <p className="text-white lg:text-2xl mb-6">
          Total Price: ₹ {Number(total)}
        </p>
        <button
          disabled={data.length === 0}
          className={`w-full ${
            data.length === 0
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600"
          } text-black font-semibold py-2 px-4 rounded-lg`}
          onClick={handlePlaceOrder}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
