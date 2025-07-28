import express from "express";
import upload from "../middleware/userMulter.js";
import {
  userAddressValidation,
  userFieldValidation,
} from "../middleware/user.validation.js";
import {
  getUserdetailsController,
  userLoginController,
  userLogoutController,
  userRegisterController,
} from "../controllers/user.controller.js";

const router = express.Router();

// user register routes
router.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),

  userFieldValidation,
  userAddressValidation,
  userRegisterController
);

import { verifyJWT } from "../middleware/auth.middleware.js";

// user login routes
router.post("/login", userLoginController);

// user logout routes
router.post("/logout", verifyJWT, userLogoutController);

//get user details
router.get("/get-user-details", verifyJWT, getUserdetailsController);

export default router;
