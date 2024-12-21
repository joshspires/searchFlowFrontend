import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
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
      <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
        {/* Error Alert */}
        {error.apiError && (
          <div className="bg-red-100 text-red-700 border border-red-400 p-2 rounded mb-4">
            {error.apiError}
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">searchFlow</h2>
        <p className="text-sm text-center text-gray-600 mb-6">Already have an account? Login.</p>

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
            className={`w-full border ${
              error.email ? "border-red-500" : "border-gray-300"
            } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your email"
          />
          {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={`w-full border ${
              error.password ? "border-red-500" : "border-gray-300"
            } rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter your password"
          />
          {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
        </div>

        {/* Submit Button */}
        <button
          onClick={submitHandler}
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Signup"}
        </button>
      </div>
    </div>
  );
}
