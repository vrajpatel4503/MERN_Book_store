import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Middleware
const corsOptions = {
  origin: "http://localhost:5173", // Allow only frontend URL
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // middleware function in Express.js used to parse incoming requests with URL-encoded payloads

// -------------------------------------------- Routes --------------------------------------------

// Routes import
import userRoutes from "./routes/user.routes.js";
import bookRoutes from "./routes/book.routes.js";
import favouriteRoutes from "./routes/favourite.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

// Routes declaration
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/book", bookRoutes);
app.use("/api/v1/favourite", favouriteRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);

export default app;
