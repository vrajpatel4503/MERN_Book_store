import express from "express"
import {verifyJWT} from "../middleware/auth.middleware.js"
import { getAllOrderByAdminController, getOrderOfUserController, placeOrderController, removeFromCartController, updateStatusController } from "../controllers/order.controller.js"

const router = express.Router()

// place order routes
router.post("/place-order", verifyJWT, placeOrderController)

// remove order routes
router.put("/remove-order", verifyJWT, removeFromCartController)

// get order history routes
router.get("/get-orders-history", verifyJWT, getOrderOfUserController)

// ------- Routes for admin role ----------------

// get all order for admin routes
router.get("/get-all-orders", verifyJWT, getAllOrderByAdminController)

// update the order admin routes
router.put("/update-status-of-order/:id", verifyJWT, updateStatusController);

export default router