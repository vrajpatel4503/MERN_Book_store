import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";
import { useParams, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bookTitle: "",
    bookAuthor: "",
    bookPrice: "",
    bookDescription: "",
    bookLanguage: "",
    bookPublisher: "",
    bookSeller: "",
    bookPhoto: null,
  });

  // Fetch book data on mount
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/book/get-book-by-id/${id}`
        );
        const book = res.data.data;

        setFormData({
          bookTitle: book.bookTitle || "",
          bookAuthor: book.bookAuthor || "",
          bookPrice: book.bookPrice || "",
          bookDescription: book.bookDescription || "",
          bookLanguage: book.bookLanguage || "",
          bookPublisher: book.bookPublisher || "",
          bookSeller: book.bookSeller || "",
          bookPhoto: null,
        });
      } catch (error) {
        console.log(error);
        showErrorToast(
          error.response?.data?.message || "Failed to fetch book details"
        );
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      bookPhoto: e.target.files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("bookTitle", formData.bookTitle);
      formDataToSubmit.append("bookAuthor", formData.bookAuthor);
      formDataToSubmit.append("bookPrice", formData.bookPrice);
      formDataToSubmit.append("bookDescription", formData.bookDescription);
      formDataToSubmit.append("bookLanguage", formData.bookLanguage);
      formDataToSubmit.append("bookPublisher", formData.bookPublisher);
      formDataToSubmit.append("bookSeller", formData.bookSeller);
      if (formData.bookPhoto) {
        formDataToSubmit.append("bookPhoto", formData.bookPhoto);
      }

      const res = await axios.put(
        `http://localhost:8000/api/v1/book/update-book/${id}`,
        formDataToSubmit,
        { withCredentials: true }
      );

      showSuccessToast(res.data.message || "Book updated successfully");

      setTimeout(() => {
        navigate(`/view-book-details/${id}`);
      }, 1500);

      setFormData({
        bookTitle: "",
        bookAuthor: "",
        bookPrice: "",
        bookDescription: "",
        bookLanguage: "",
        bookPublisher: "",
        bookSeller: "",
        bookPhoto: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error.response?.data || error);
      showErrorToast(error.response?.data?.message || "Book update failed");
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen py-10 px-4">
      <h2 className="text-4xl text-white text-center font-semibold mb-6">
        Update Book
      </h2>

      <div className="max-w-2xl mx-auto p-6 bg-zinc-800 text-white rounded shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Book Photo */}
          <div>
            <label className="block mb-1 font-medium">Book Image</label>
            <input
              type="file"
              name="bookPhoto"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block mb-1 font-medium">Author</label>
            <input
              type="text"
              name="bookAuthor"
              value={formData.bookAuthor}
              onChange={handleChange}
              className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2"
              required
            />
          </div>

          {/* Seller */}
          <div>
            <label className="block mb-1 font-medium">Seller</label>
            <input
              type="text"
              name="bookSeller"
              value={formData.bookSeller}
              onChange={handleChange}
              className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2"
              required
            />
          </div>

          {/* Publisher */}
          <div>
            <label className="block mb-1 font-medium">Publisher</label>
            <input
              type="text"
              name="bookPublisher"
              value={formData.bookPublisher}
              onChange={handleChange}
              className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="bookDescription"
              rows="3"
              value={formData.bookDescription}
              onChange={handleChange}
              className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2"
              required
            ></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium">Price (₹)</label>
            <input
              type="number"
              name="bookPrice"
              value={formData.bookPrice}
              onChange={handleChange}
              className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2"
              required
            />
          </div>

          {/* Language */}
          <div>
            <label className="block mb-1 font-medium">Language</label>
            <input
              type="text"
              name="bookLanguage"
              value={formData.bookLanguage}
              onChange={handleChange}
              className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-amber-400 text-black font-semibold py-2 rounded hover:bg-amber-500 transition duration-300"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
