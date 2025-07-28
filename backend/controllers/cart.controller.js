import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import mongoose from "mongoose";

// Add to cart controller
export const addToCartController = async (req, res) => {
  try {
    const { id } = req.user;
    const { bookId } = req.body;

    // Step 1: Ensure the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Step 2: Check if the book is already in the user's cart
    const user = await User.findById(id);
    if (user.cart.includes(bookId)) {
      return res.status(409).json({
        success: false,
        message: "Book is already in cart",
      });
    }

    // Step 3: Add to cart
    await User.findByIdAndUpdate(id, {
      $push: { cart: bookId },
    });

    return res.status(200).json({
      success: true,
      message: "Book added to cart",
    });
  } catch (error) {
    console.log(`Error in addToCartController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// remove from cart controller

export const removeFromCartController = async (req, res) => {
  try {
    const { id } = req.user;
    const { bookId } = req.params;

    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookId },
    });

    return res.status(200).json({
      success: true,
      message: "Book removed from cart",
    });
  } catch (error) {
    console.log(`Error in removeFromCartController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get cart of a particular user controller
export const getUserCartController = async (req, res) => {
  try {
    const { id } = req.user;

    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();

    return res.status(200).json({
      success: true,
      data: cart,
    });

    // try part end
  } catch (error) {
    console.log(`Error in getUserCartController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
