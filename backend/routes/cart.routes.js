import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addToCartController,
  getUserCartController,
  removeFromCartController,
} from "../controllers/cart.controller.js";

const router = express.Router();

// add book to cart routes
router.put("/add-to-cart", verifyJWT, addToCartController);

// delete book to cart routes
router.put("/remove-from-cart/:bookId", verifyJWT, removeFromCartController);

// get particular user cart
router.get("/get-all-book-from-cart", verifyJWT, getUserCartController);

export default router;
