// AppRoutes.jsx
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Pages and Layout
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Aboutus from "./pages/Aboutus.jsx";
import Allbook from "./pages/Allbook.jsx";
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails.jsx";
import UserOrderHistory from "./components/Profile/UserOrderHistory.jsx";
import Setting from "./components/Profile/Setting.jsx";
import ProfileIndex from "./components/Profile/ProfileIndex.jsx";
import Addbook from "./pages/Addbook.jsx";
import Allorder from "./pages/Allorder.jsx";
import UpdateBook from "./pages/UpdateBook.jsx";

const AppRoutes = () => {
  const role = useSelector((state) => state.auth.role);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="allbook" element={<Allbook />} />
          <Route path="view-book-details/:id" element={<ViewBookDetails />} />
          <Route path="update-book/:id" element={<UpdateBook />} />

          {/* profile routes */}
          <Route path="profile" element={<Profile />}>
            <Route index element={<ProfileIndex />} />
            {role === "admin" && (
              <>
                <Route path="add-book" element={<Addbook />} />
                <Route path="all-order" element={<Allorder />} />
              </>
            )}
            <Route path="order-history" element={<UserOrderHistory />} />
            <Route path="setting" element={<Setting />} />
          </Route>

          <Route path="cart" element={<Cart />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRoutes;
