import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import { MdCheckCircle } from "react-icons/md";
import { showSuccessToast, showErrorToast } from "../utils/toastUtils.jsx";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: {
      state: "",
      city: "",
      street: "",
      pincode: "",
    },
    avatar: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["state", "city", "street", "pincode"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSubmit = new FormData();

      ["fullName", "userName", "email", "password", "phoneNumber"].forEach(
        (field) => {
          formDataToSubmit.append(field, formData[field]);
        }
      );

      Object.entries(formData.address).forEach(([key, value]) => {
        formDataToSubmit.append(`address[${key}]`, value);
      });

      if (formData.avatar) {
        formDataToSubmit.append("avatar", formData.avatar);
      }

      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        formDataToSubmit
      );

      showSuccessToast(res.data.message || "User registered successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(
        `Error in fetching user details :- ${error.response?.data || error}`
      );

      showErrorToast(
        error.response?.data?.message || "Failed to register. Please try again"
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-zinc-900">
        <div className="max-w-lg mx-auto bg-zinc-800 p-6 sm:p-8 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block font-medium mb-1 text-white">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* User Name */}
            <div>
              <label className="block font-medium mb-1 text-white">
                User Name
              </label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-3 text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1 text-white">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                className="w-full px-3 text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-medium mb-1 text-white">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
              <div>
                <label className="block font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-white">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="w-full px-3 text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-white">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  className="w-full px-3 text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-white">
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="w-full px-3 text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
            </div>

            {/* Avatar Upload */}
            <div>
              <label className="block font-medium mb-1 text-white">
                Avatar
              </label>
              <input
                type="file"
                name="avatar"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full px-3 text-white py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-amber-200 text-white py-2 rounded-md hover:bg-amber-400 transition duration-300"
            >
              Register
            </button>

            {/* Already Registered */}
            <p className="text-center text-sm sm:text-base text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-amber-400 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;

/*
In react toastify i am using custom color to show success and error message and i am using a seprates icon
*/
