// Cravely / Client / src / components / Login / Login.jsx
import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import { inputBase } from "../../assets/dummydata";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import API_ROUTES from "../../api/api_route";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../utils/toast";

const Login = ({ onLoginSuccess, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("loginData");
    if (stored) setFormData(JSON.parse(stored));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post(API_ROUTES.USER.USER_LOGIN, {
        email: formData.email,
        password: formData.password,
      });

      console.log("User Login API Response:", data);

      if (data.success && data.token) {
        localStorage.setItem("authToken", data.token);

        formData.rememberMe
          ? localStorage.setItem("loginData", JSON.stringify(formData))
          : localStorage.removeItem("loginData");

        showSuccessToast(data.message);

        setTimeout(() => {
          onLoginSuccess(data.token);
          navigate("/");
        }, 2000);

        console.log("User Login Success:", data.message);

        navigate("/");
      } else {
        showWarningToast(data.message);
        console.log("User Login Data Error:", data.message);
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || error?.message);
      console.log("User Login Error:", error);
    }
  };

  const handleChange = ({ target: { name, value, type, checked } }) =>
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="space-y-6 relative">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-teal-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`${inputBase} pl-10 pr-4 py-3`}
          />
        </div>

        <div className="relative">
          <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-teal-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`${inputBase} pl-10 pr-4 py-3`}
          />

          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-teal-600 bg-[#2D180E] border-teal-400 rounded focus:ring-teal-600"
            />
            <span className="ml-2 text-teal-100">Remember me</span>
          </label>
        </div>

        <button className="w-full py-3 bg-linear-to-r from-teal-400 to-teal-600 text-[#2D180E] font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer">
          Sign In <FaArrowRight />
        </button>

        <div className="text-center">
          <Link
            to="/signup"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-600 transition-colors"
          >
            <FaUserPlus /> Create a new account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
