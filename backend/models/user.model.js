import mongoose from "mongoose";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    address: {
      state: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      pincode: { type: String, required: true, trim: true },
    },

    avatar: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },

    favourites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Book",
      },
    ],

    cart: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Book",
      },
    ],

    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Order",
      },
    ],

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return JWT.sign(
    {
      id: this._id,
      fullName: this.fullName,
      userName: this.userName,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return JWT.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);
export default User;

// JWT.sign takes 3 arguments: payload, secret, and options.

// --------- Payload ----------
//       {
//       id: this._id,
//       fullName: this.fullName,
//       userName: this.userName,
//       email: this.email,
//     },

// --------- secret ----------
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
