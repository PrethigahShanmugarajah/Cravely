import { useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import API_ROUTES from "../../api/api_route";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../utils/toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);
    try {
      const { data } = await api.post(API_ROUTES.USER.USER_REGISTER, formData);
      console.log("User Register API Response:", data);

      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token);
        showSuccessToast(data.message);
        console.log("User Register Success:", data.message);
        navigate("/");
      } else {
        showWarningToast(data.message);
        console.log("User Register Data Error:", data.message);
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || error?.message);
      console.log("User Register Error:", error);
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] p-4">
      <div className="w-full max-w-md bg-linear-to-br from-[#0F172A] to-[#1E293B] p-8 rounded-xl shadow-lg border-4 border-teal-700/30 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center bg-linear-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform">
          Create an account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#0F172A] text-teal-100 placeholder:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-200 hover:scale-[1.02]"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#0F172A] text-teal-100 placeholder:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-200 hover:scale-[1.02]"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#0F172A] text-teal-100 placeholder:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-all duration-200 hover:scale-[1.02]"
              required
            />

            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-4 flex items-center text-teal-400 hover:text-teal-600 transition-all transform hover:scale-125 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r from-teal-400 to-teal-600 text-[#0F172A] font-bold rounded-md hover:scale-105 transition-transform duration-300 hover:shadow-lg cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="group inline-flex items-center text-teal-400 hover:text-teal-600 transition-all duration-300"
          >
            <FaArrowLeft className="mr-2 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
            <span className="transform group-hover:-translate-x-2 transition-all duration-300">
              Back To Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
