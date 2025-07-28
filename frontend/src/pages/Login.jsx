import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { showSuccessToast, showErrorToast } from "../utils/toastUtils.jsx";
import { authActions } from "../store/authSlice.js";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // handle user login details
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle user login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(res.data.user)  // debug
      dispatch(authActions.login());
      dispatch(authActions.changeRole(res.data.user.role));

      //  store values after receiving response
      localStorage.setItem("id", res.data.user._id);
      localStorage.setItem("role", res.data.user.role);

      showSuccessToast(res.data.message || "Login successful");

      navigate("/home");
    } catch (error) {
      console.log(`Error in login :- ${error}`);
      showErrorToast(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen px-4 sm:px-6 lg:px-8 py-10 bg-zinc-900">
        <div className="max-w-lg mx-auto my-10 p-6 rounded-xl border-1 shadow-md  bg-zinc-800">
          <h2 className="text-3xl font-bold mb-4 text-center text-white">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block font-medium mb-1 text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium mb-1 text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 text-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-amber-200 text-white p-2 rounded-md hover:bg-amber-400 transition duration-300"
            >
              Login
            </button>

            <p className="text-md text-white">
              Doesn't have account?{" "}
              <span className="text-amber-400 ">
                <Link to="/register">Register</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
