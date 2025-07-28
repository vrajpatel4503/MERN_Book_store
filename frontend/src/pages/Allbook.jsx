import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Bookcard from "../components/BookCard/Bookcard";
import axios from "axios";

const Allbook = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/book/get-all-book");
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching all books:", error);
      }
    };

    fetchBook();
  }, []);

  return (
    <div className="bg-zinc-900 min-h-screen px-4">
      <div className="max-w-7xl mx-auto py-8">
        <h4 className="text-2xl md:text-4xl text-amber-300 font-semibold mb-6">
          All Books
        </h4>

        {!data ? (
          <div className="flex items-center justify-center h-64">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
            {data.map((item, i) => (
              <Bookcard key={i} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Allbook;
