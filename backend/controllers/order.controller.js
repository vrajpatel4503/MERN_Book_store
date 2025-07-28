import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import Order from "../models/order.model.js";

// place order controller

export const placeOrderController = async (req, res) => {
  try {
    const { id } = req.user; // From JWT auth middleware
    const { order } = req.body;

    // 1. Validate incoming order
    if (!order || !Array.isArray(order) || order.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order data is invalid or empty.",
      });
    }

    // 2. Create individual orders for each book
    for (const orderData of order) {
      const newOrder = new Order({
        user: id,
        book: orderData.bookId, // must match frontend payload
      });

      const savedOrder = await newOrder.save();

      // console.log("Saved order:", savedOrder);

      // 3. Push the saved order reference into the user's `orders` array
      await User.findByIdAndUpdate(id, {
        $push: { orders: savedOrder._id },
      });
    }

    // 4. Clear the user's cart
    await User.findByIdAndUpdate(id, {
      $set: { cart: [] },
    });

    return res.status(200).json({
      success: true,
      message: "Order placed successfully and cart cleared.",
    });
  } catch (error) {
    console.log(`Error in placeOrderController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// remove from the cart controller

export const removeFromCartController = async (req, res) => {
  try {
    const { id } = req.user;
    const { bookId } = req.body;

    await User.findByIdAndUpdate(id, {
      $pull: { cart: bookId },
    });

    return res.status(200).json({
      success: true,
      message: "Book removed from cart",
    });
  } catch (error) {
    console.log(`Error in removeFromCartController: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get order of a particular for user user controller
export const getOrderOfUserController = async (req, res) => {
  try {
    const { id } = req.user;

    // 1. Find the user and populate their orders and each book inside
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: {
        path: "book",
        model: "Book", //  Make sure to specify the model name
      },
    });

    // 2. Handle case: user not found
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Reverse order for recent-first
    const orderData = [...userData.orders].reverse();

    // 4. Send successful response
    return res.status(200).json({
      success: true,
      data: orderData,
    });
  } catch (error) {
    console.log(`Error in getOrderOfUserController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// --------------- For admon controller -----------------------

// get all order --admin role controller

export const getAllOrderByAdminController = async (req, res) => {
  try {
    const orderData = await Order.find()
      .populate({
        path: "book", // path: "book" belong to order models
      })
      .populate({
        path: "user", // path: "user" belong to order models
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: orderData,
    });
  } catch (error) {
    console.log(`Error in getAllOrderByAdminController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// admin update the order controller
export const updateStatusController = async (req, res) => {
  try {
    const adminId = req.user;
    const { id: orderId } = req.params;

    const admin = await User.findById(adminId);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins can update order status.",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.log(`Error in updateStatusController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// place order controller
/*
export const placeOrderController = async (req, res) => {
  try {
    const { id } = req.user;
    const { order } = req.body; // this should be an array of books [{_id: ...}, ...]

    if (!Array.isArray(order) || order.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order array is required",
      });
    }

    for (const orderData of order) {
      // 1. Create new order
      const newOrder = new Order({
        user: id,
        book: orderData._id,
      });
      const savedOrder = await newOrder.save();

      // 2. Push order ID to user's orders list
      await User.findByIdAndUpdate(id, {
        $push: { orders: savedOrder._id },
      });

      // 3. Remove the book from the user's cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });

  } catch (error) {
    console.log(`Error in placeOrderController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
*/

// get order of a particular user
/*

export const getOrderOfUserController = async (req, res) => {
  try {
    const { id } = req.user;

    // Populate orders from User model, and also populate book inside each order
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: {
        path: "book", // This should match the Order model field
        model: "Book",
      },
    });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const orderData = [...userData.orders].reverse(); // reverse for recent-first

    return res.status(200).json({
      success: true,
      data: orderData,
    });
  } catch (error) {
    console.log(`Error in getOrderOfUserController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
*/
