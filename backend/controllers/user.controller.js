import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import uploadOnCloudinary from "../cloudinary/cloudinary.js";

// Generate refresh and access token
const generateRefreshTokenAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    return { accessToken, refreshToken };

    // try part end
  } catch (error) {
    console.log(`Error in generateRefreshTokenAndAccessToken :- ${error}`);
  }
};

// ----------------------- User register controller
export const userRegisterController = async (req, res) => {
  try {
    const { fullName, userName, email, password, phoneNumber } = req.body;

    const address = req.address;
    // Check for if email is already exist
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email is already exist",
      });
    }

    // Hash Password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Validate avatar upload
    if (!req.files || !req.files.avatar || !req.files.avatar.length) {
      return res.status(400).json({
        success: false,
        message: "Avatar is required. Please upload an image.",
      });
    }

    // Upload avatar to cloudinary
    const avatarPath = req.files.avatar[0].path;
    const avatarUpload = await uploadOnCloudinary(avatarPath);

    if (!avatarUpload?.url) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload avatar.Please try again",
      });
    }

    // Create a new user
    const user = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      phoneNumber,
      address: {
        state: address?.state,
        city: address?.city,
        street: address?.street,
        pincode: address?.pincode,
      },
      avatar: avatarUpload.url,
    });

    // Save user to database
    await user.save();

    // Retrieve user detail without sensitive fields
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      return res.status(500).json({
        success: false,
        message: "user registration failed. Please try again",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User registration successfully.",
      createdUser,
    });

    // try part end
  } catch (error) {
    console.log(`Error in userRegisterController :- ${error}`);
    return res.status(500).josn({
      success: false,
      message: "Internal server error",
    });
  }
};

// ---------------- User Login Controller ----------------------
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check for email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email id is not exist.",
      });
    }

    // Check for valid password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // Generate access and refresh token
    const { accessToken, refreshToken } =
      await generateRefreshTokenAndAccessToken(user._id);

    // Retrieve user details excluding sensitive data
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    };

    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .status(200)
      .json(
        {
          success: true,
          message: `Welcome back ${user.fullName}`,
          user: loggedInUser,
          accessToken,
          refreshToken,
        }
        // console.log(accessToken),
        // console.log(refreshToken)
      );

    // try part end
  } catch (error) {
    console.log(`Error in userLoginController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// User Logout Controller
export const userLogoutController = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $unset: { refreshToken: "" },
    });

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    };

    return res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "User logged out successfully",
      });
    // try part end
  } catch (error) {
    console.log(`Error in userLogoutController :- ${error}`);
    return res.status(500).json({});
  }
};


//  get user details
export const getUserdetailsController = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

    // try part end
  } catch (error) {
    console.log(`Error in getuserdetailsController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
