import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils.jsx";
import { useNavigate, Link } from "react-router-dom";

const ViewBookDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  // console.log(isLoggedIn);
  // console.log(role);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/book/get-book-by-id/${id}`
        );
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-zinc-900">
        <Loader />
      </div>
    );
  }

  if (!data) {
    return <p className="text-white text-center mt-10">No data found.</p>;
  }

  // handle Favourite
  const handleFavourite = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/favourite/add-book-to-favourite",
        { bookId: id },
        { withCredentials: true }
      );
      showSuccessToast(res.data.message || "Book added to favourite");
      console.log(res);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Already in favourite");
    }
  };

  // handle delete
  const handleDelete = async () => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/api/v1/book/delete-book/${id}`,
      { withCredentials: true }
    );
    showSuccessToast(res.data.message || "Book deleted successfully");
    navigate("/allbook")
    console.log(res);
  } catch (error) {
    showErrorToast(error.response?.data?.message || "Failed to delete book");
  }
};


  // handle cart
  const handleCart = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/cart/add-to-cart",
        { bookId: id },
        { withCredentials: true }
      );
      showSuccessToast(res.data.message || "Book added to cart");
      // console.log(res);
    } catch (error) {
      showErrorToast(error.response?.data?.message || "Already in cart");
    }
  };

  return (
    <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8">
      <div className="bg-zinc-800 rounded p-4 w-full md:w-2/5 relative">
        {/* Buttons for user */}
        {isLoggedIn === true && role === "user" && (
          <>
            <div className="absolute top-4 right-4 flex flex-col gap-4 z-10">
              <button
                className="bg-white rounded-full text-2xl p-2 shadow hover:bg-amber-400 transition"
                onClick={handleFavourite}
              >
                <FaHeart />
              </button>
              <button
                className="bg-white rounded-full text-2xl p-2 shadow  transition hover:bg-amber-400"
                onClick={handleCart}
              >
                <FaShoppingCart />
              </button>
            </div>
          </>
        )}

        {/* Buttons for admin */}
        {isLoggedIn === true && role === "admin" && (
          <div className="absolute top-4 right-4 flex flex-col gap-4 z-10">
            {/* Edit button */}
            <Link to={`/update-book/${id}`} className="bg-white rounded-full text-2xl p-2 shadow hover:bg-amber-400 transition">
              <FaEdit />
            </Link>

            {/* Delete button */}
            <button
              className="bg-white rounded-full text-2xl p-2 shadow hover:bg-red-600 transition"
              onClick={handleDelete}
            >
              <AiFillDelete />
            </button>
          </div>
        )}

        {/* Book Image */}
        <img
          src={data.bookPhoto}
          alt="book"
          className="h-64 md:h-[70vh] object-contain mx-auto"
        />
      </div>

      <div className="p-2 md:p-4 w-full md:w-3/5">
        <h1 className="text-2xl md:text-4xl text-zinc-300 font-semibold">
          {data.bookTitle}
        </h1>
        <p className="text-zinc-400 mt-1 text-base md:text-lg">
          {data.bookAuthor}
        </p>
        <p className="text-zinc-400 mt-1 text-sm md:text-base">
          Sold by: {data.bookSeller}
        </p>

        <p className="text-zinc-500 mt-4 text-base md:text-lg whitespace-pre-line leading-relaxed">
          {data.bookDescription}
        </p>

        <p className="flex mt-4 items-center text-zinc-400 text-sm md:text-base">
          <GrLanguage className="text-lg mr-2" /> {data.bookLanguage}
        </p>
        <p className="mt-4 text-zinc-300 text-xl md:text-2xl font-semibold">
          Price: ₹ {data.bookPrice}
        </p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
