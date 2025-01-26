import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { forgotPassword } from "../apiManager/user";
import toast from "react-hot-toast";


export default function Login() {
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const userId = userInfo?.data.userId;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.data.userRole === 'admin') {
        navigate("/admin-dashboard");
      }
      else if (!userInfo.data.isEmailVerified) {
        navigate("/verify-email");
      } else if (userInfo.data.webflowAccessToken == null) {
        navigate("/connect-webflow");
      } else {
        navigate(`/dashboard?userId=${userId}`);
      }
    }
  }, [userInfo, navigate]);

  const validateInputs = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setIsLoginLoading(true);

    try {
      const res = await login({ email, password }).unwrap();
      if (!res.data) {
        setErrors({ apiError: res.message });
        return;
      }
      dispatch(setCredentials({ ...res }));
      navigate(res.data.isEmailVerified ? navigate(`/dashboard?userId=${userId}`) : "/verify-email");
    } catch (err) {
      if (err?.data?.data) {
        dispatch(setCredentials({ ...err?.data }));
      }
      setErrors({ apiError: err?.data.message || "An error occurred during login." });
      toast.dismiss()
      toast.error(err?.data.message || "Error occured")
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setForgotError("Please enter your email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setForgotError("Invalid email format.");
      return;
    }

    setForgotError("");
    setForgotSuccess("");
    setIsForgotLoading(true);

    try {
      const res = await forgotPassword(forgotEmail);
      if (!res.data) {
        setForgotError(res.message);
        return;
      }
      setForgotSuccess(res.message);
    } catch (error) {
      setForgotError(
        error.message ||
        "An error occurred while resetting the password. Please try again."
      );
    } finally {
      setIsForgotLoading(false);
    }
  };

  return (
    <div className="flex border items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 px-5 py-8 bg-white border border-black rounded-lg ">
        {errors.apiError && (
          <p className="text-red-500 text-center mb-4">{errors.apiError}</p>
        )}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
          searchFlow
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Create one now.
          </span>
        </p>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full px-4 py-3 text-gray-700 bg-white border border-black rounded focus:outline-none"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 bg-white border border-black rounded focus:outline-none"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ?
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" /></svg>}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>


        <div className="text-right mb-6">
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={() => setIsModalOpen(true)}
          >
            Forgot password? Reset it now.
          </button>
        </div>

        <button
          onClick={submitHandler}
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
        >
          {isLoginLoading ? "Logging in..." : "Login"}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg  w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
            <label className="block text-gray-700 font-medium mb-1">
              Enter your email:
            </label>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${forgotError
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
                }`}
            />
            {forgotError && (
              <p className="text-red-500 text-sm mt-1">{forgotError}</p>
            )}
            {forgotSuccess && (
              <p className="text-green-500 text-sm mt-1">{forgotSuccess}</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleForgotPassword}
                className={`bg-black text-white px-4 py-2 rounded hover:bg-gray-800 ${isForgotLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                disabled={isForgotLoading}
              >
                {isForgotLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
