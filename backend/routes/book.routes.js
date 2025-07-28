import express from "express";
import uploadBook from "../middleware/BookMulter.js";
import { bookFieldValidation } from "../middleware/book.validation.js";
import {
  addBookController,
  deleteBookController,
  getAllBookController,
  getBookByIdController,
  getRecentlyAddBookController,
  updateBookController,
} from "../controllers/book.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// book upload routes
router.post(
  "/bookupload",
  uploadBook.array("bookPhoto", 1),

  verifyJWT,
  bookFieldValidation,
  addBookController
);

// update book routes
router.put(
  "/update-book/:bookId",
  uploadBook.none(), // accepts only text fields, no files
  verifyJWT,
  updateBookController
);

// delete  book routes
router.delete("/delete-book/:bookId", verifyJWT, deleteBookController);

// get all book routes
router.get("/get-all-book", getAllBookController);

// get latest book routes
router.get("/get-recently-add-book", getRecentlyAddBookController);

// get book by id routes
router.get("/get-book-by-id/:bookId", getBookByIdController);

export default router;
