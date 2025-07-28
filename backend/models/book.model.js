import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookPhoto: {
      type: [String],
      required: true,
    },

    bookTitle: {
      type: String,
      required: true,
      unique: true,
    },

    bookAuthor: {
      type: String,
      required: true,
    },

    bookPrice: {
      type: String,
      required: true,
    },

    bookDescription: {
      type: String,
      required: true,
    },

    bookLanguage: {
      type: String,
      required: true,
    },

    bookPublisher: {
      type: String,
      required: true,
    },

    bookSeller : {
      type : String,
      required : true
    }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
