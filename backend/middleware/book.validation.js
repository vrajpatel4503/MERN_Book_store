import Book from "../models/book.model.js";

export const bookFieldValidation = (req, res, next) => {
  const {
    bookAuthor,
    bookPrice,
    bookDescription,
    bookLanguage,
    bookPublisher,
    bookSeller
  } = req.body;

  

  if (!bookAuthor) {
    return res.status(400).json({
      success: false,
      message: "Book Title is required",
    });
  }

  if (!bookPrice) {
    return res.status(400).json({
      success: false,
      message: "Book Title is required",
    });
  }

  if (!bookDescription) {
    return res.status(400).json({
      success: false,
      message: "Book Title is required",
    });
  }

  if (!bookLanguage) {
    return res.status(400).json({
      success: false,
      message: "Book Title is required",
    });
  }

  if (!bookPublisher) {
    return res.status(400).json({
      success: false,
      message: "Book Title is required",
    });
  }

  if (!bookSeller) {
    return res.status(400).json({
      success: false,
      message: "Book Seller is required",
    });
  }

  next();
};
