import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn)
  const role = useSelector((state) => state.auth.role);

  const navLinks = (
    <>
      <Link
        to="/home"
        onClick={closeMobileMenu}
        className="text-lg font-medium hover:text-amber-400"
      >
        Home
      </Link>
      <Link
        to="/allbook"
        onClick={closeMobileMenu}
        className="text-lg font-medium hover:text-amber-400"
      >
        All Books
      </Link>
      <Link
        to="/aboutus"
        onClick={closeMobileMenu}
        className="text-lg font-medium hover:text-amber-400"
      >
        About Us
      </Link>
      <>
        {/* for user */}
        {isLoggedIn === true && role === "user" && (
          <>
            <Link
              to="/cart"
              onClick={closeMobileMenu}
              className="text-lg font-medium hover:text-amber-400"
            >
              Cart
            </Link>
            <Link
              to="/profile"
              onClick={closeMobileMenu}
              className="text-lg font-medium hover:text-amber-400"
            >
              Profile
            </Link>
          </>
        )}

        {/* for admin */}
        {isLoggedIn === true && role === "admin" && (
          <>
            <Link
              to="/profile"
              onClick={closeMobileMenu}
              className="text-lg font-medium hover:text-amber-400"
            >
              Admin Profile
            </Link>
          </>
        )}
      </>
    </>
  );

  const authButtons = (
    <>
      {!isLoggedIn && (
        <>
          <Link to="/login" onClick={closeMobileMenu}>
            <button className="text-lg font-medium border-2 py-1 px-3 rounded-3xl hover:bg-amber-500 transition duration-150">
              Login
            </button>
          </Link>
          <Link to="/register" onClick={closeMobileMenu}>
            <button className="text-lg font-medium border-2 py-1 px-3 rounded-3xl hover:bg-amber-500 transition duration-150">
              Register
            </button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="z-50 relative flex items-center justify-between bg-zinc-800 text-white px-8 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <h1>BookBazaar</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks}
          {authButtons}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <IoReorderThreeOutline />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-900 fixed top-0 left-0 w-full h-screen z-40 flex flex-col items-center justify-center gap-6 text-white text-xl">
          {navLinks}
          {authButtons}
          <button
            onClick={closeMobileMenu}
            className="absolute top-4 right-6 text-3xl"
          >
            ✖
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
