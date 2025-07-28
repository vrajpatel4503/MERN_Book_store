import axios from "axios";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

const Favourite = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/favourite/get-all-book-from-favourite",
          {
            withCredentials: true,
          }
        );
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  const handleCart = async (bookId) => {
     try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/cart/add-to-cart",
        { bookId },
        { withCredentials: true }
      );

      showSuccessToast(
        res.data.message ||
          "Book added to cart"
      );

      // Remove book from UI
      setTimeout(() => {
        setData((prev) => prev.filter((book) => book._id !== bookId));
      }, 1500);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Internal server error")
    }
  };

  const handleRemoveFromFavourite = async (bookId) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/favourite/delete-book-from-favourite",
        { bookId },
        { withCredentials: true }
      );

      showSuccessToast(
        res.data.message ||
          "Book has been removed from your favorites successfully"
      );

      // Remove book from UI
      setTimeout(() => {
        setData((prev) => prev.filter((book) => book._id !== bookId));
      }, 1500);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Internal server error")
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Favourite Books</h2>

      {data.length === 0 ? (
        <p className="text-gray-400">No favourite books found.</p>
      ) : (
        <div className="space-y-6">
          {data.map((book) => (
            <div
              key={book._id}
              className="bg-zinc-900 border border-gray-700 rounded-xl p-4 flex flex-col md:flex-row gap-6 shadow-lg"
            >
              {/* Box 1: Image */}
              <div className="md:w-1/4">
                <img
                  src={book.bookPhoto}
                  alt={book.bookTitle || "Book cover"}
                  className="w-36 h-52 object-cover rounded-lg bg-gray-800"
                />
              </div>

              {/* Box 2: Details */}
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

              {/* Box 3: Actions */}
              <div className="ml-auto flex items-start gap-4">
                <button
                  className="border rounded-full p-2 hover:bg-amber-400"
                  onClick={() => handleCart(book._id)}
                >
                  <FaShoppingCart className="text-2xl text-white" />
                </button>
                <button
                  className="border rounded-full p-2 hover:bg-red-600"
                  onClick={() => handleRemoveFromFavourite(book._id)}
                >
                  <AiFillDelete className="text-2xl text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;
