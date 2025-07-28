import JWT from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const cookieToken = req.cookies?.accessToken;
    const authHeader = req.headers.authorization;

    const headerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    //  ------ Debug ------
    // console.log("Access Token (from cookie):", cookieToken);
    // console.log("Authorization Header:", authHeader);

    const token = cookieToken || headerToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized : No token provided",
      });
    }

    let decodedToken;
    try {
      decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      console.log(`JWT verification error :- ${error.message}`);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    if (!decodedToken?.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    const user = await User.findById(decodedToken.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();

    // try part end
  } catch (error) {
    console.log(`Error in verifyJWT :- ${error}`);
  }
};

//  --------- Login ---------
// STEP 1: Get token from cookies and headers
// STEP 2: If Authorization header starts with "Bearer", extract the token
// STEP 3: Choose token from either cookie or header
// STEP 4: If no token is found, return 401 Unauthorized
// STEP 5: Verify the token using JWT secret key
// STEP 6: If token payload doesn't have a user ID, reject request
// STEP 7: Fetch user from DB using ID from token
// STEP 8: If user not found in DB, return error
// STEP 9: Attach user info to the request object for further use in routes
// STEP 10: Call next() to pass control to the next middleware or controller
