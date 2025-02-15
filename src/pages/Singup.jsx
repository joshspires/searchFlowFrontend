import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import React, { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format.";
    if (!password.trim()) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent form default submission
    if (!validateForm()) return; // Prevent submission if validation fails

    try {
      const res = await register({ email, password }).unwrap();
      if (!res.data) {
        setError({ apiError: res.message }); // API-specific error
        return;
      }
      setError({});
      dispatch(setCredentials({ ...res }));
      navigate("/verify-email"); // Redirect on successful registration
    } catch (err) {
      setError({ apiError: err.message || err.error });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 px-5 py-10 bg-white border border-secondary  rounded">
        {/* Error Alert */}
        {error.apiError && (
          <div className="bg-red-100 text-red-700 border border-red-400 p-2 rounded mb-4">
            {error.apiError}
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">searchFlow</h2>
        <p className="text-sm text-center text-gray-600 mb-6">Already have an account? {" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline cursor-pointer"
          >Login</span>
          .</p>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={`w-full border ${error.email ? "border-red-500" : "border-secondary"
              } w-full px-4 py-3 text-gray-700 bg-white border border-secondary rounded rounded px-3 py-2 focus:outline-none `}
            placeholder="Enter your email"
          />
          {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className={`w-full border ${error.password ? "border-red-500" : "border-secondary"
                } px-4 py-3 text-gray-700 bg-white border border-secondary rounded focus:outline-none rounded px-3 py-2`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            >
              {showPassword ?
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" /></svg>}
            </button>
          </div>
          {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
        </div>


        {/* Submit Button */}
        <button
          onClick={submitHandler}
          type="submit"
          className="w-full bg-primary text-white py-2 rounded bg-secondary transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Signup"}
        </button>
      </div>
    </div>
  );
}
