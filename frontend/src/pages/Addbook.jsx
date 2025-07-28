import React, { useState, useRef } from "react";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../utils/toastUtils";

const Addbook = () => {
  const fileInputRef = useRef(null);

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
      formDataToSubmit.append("bookPhoto", formData.bookPhoto); 

      const res = await axios.post(
        "http://localhost:8000/api/v1/book/update-book/:bookId",
        formDataToSubmit,
        { withCredentials: true }
      );

      showSuccessToast(res.data.message || "Book uploaded successfully");

      //  Reset the form after success
      setTimeout(() => {
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

        // Reset file input manually
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 1500);
    } catch (error) {
      console.log(error.response?.data || error);
      showErrorToast(error.response?.data?.message || "Book upload failed");
      //  Reset the form after fail
      setTimeout(() => {
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

        // Reset file input manually
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 1500);
    }
  };

  return (
    <>
      <h2 className=" text-4xl md:text-2xl font-semibold mb-6 flex items-center justify-center">Add New Book</h2>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-zinc-800 text-white rounded shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo */}
          <div>
            <label className="block mb-1 font-medium">Book Image</label>
            <input
              type="file"
              name="bookPhoto"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2"
              required
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
              ref={fileInputRef}
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

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-amber-400 text-black font-semibold py-2 rounded hover:bg-amber-500 transition duration-300"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addbook;
