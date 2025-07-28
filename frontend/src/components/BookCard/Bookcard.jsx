import React from "react";
import { Link } from "react-router-dom";

const Bookcard = ({ data }) => {
  return (
    <Link to={`/view-book-details/${data._id}`} className="block h-full">
      <div className="bg-zinc-800 rounded p-4 flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300">
        {/* Image with fixed height like original */}
        <div className="bg-zinc-900 rounded flex items-center justify-center h-[30vh] overflow-hidden">
          <img
            src={data.bookPhoto}
            alt={data.bookTitle}
            className="object-contain h-full w-auto p-2"
          />
        </div>

        {/* Title */}
        <h2 className="mt-4 text-lg font-semibold text-white line-clamp-2">
          {data.bookTitle}
        </h2>

        {/* Author */}
        <p className="mt-2 text-zinc-400 font-medium">by <span className="text-zinc-400">{data.bookAuthor}</span></p>

        {/* Price at the bottom */}
        <p className="mt-auto text-zinc-200 font-bold text-lg">
          ₹ {data.bookPrice}
        </p>
      </div>
    </Link>
  );
};

export default Bookcard;
