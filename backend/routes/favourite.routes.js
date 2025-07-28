import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addBookToFavourite, deleteBookFromFavouriteController, getAllBookFromFavouriteController } from "../controllers/favourite.controller.js";

const router = express.Router();

// add book to favourite routes
router.put("/add-book-to-favourite", verifyJWT, addBookToFavourite);

// delete book to favourite routes
router.put("/delete-book-from-favourite", verifyJWT, deleteBookFromFavouriteController);

// get all favourite book routes
router.get("/get-all-book-from-favourite", verifyJWT, getAllBookFromFavouriteController);


export default router;
