import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../apiManager/user";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const [password, setPassword] = useState(""); // State for new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const dispatch = useDispatch();

  const validateInputs = () => {
    if (!password) {
      setError("Password is required.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const res = await resetPassword(token, password); // Call API with token and password
      console.log(res)
      if (!res.success) {
       alert(res.message || "Failed to reset password.");
        return;
      }
      // dispatch(setCredentials({ ...res }));
      navigate("/login"); // Redirect to login page after success
    } catch (err) {
      setError(err.response.data.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-sm">
        <h1 className="text-center text-xl font-bold text-gray-900 mb-6">
          Reset Your Password
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-400"
              }`}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
                error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-400"
              }`}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
