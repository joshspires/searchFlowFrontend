import React, { useEffect, useState } from "react";
import { verifycode, resendVerificationCode } from "../apiManager/user";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";


const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]); // 6-box code input
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [resendisLoading, setResendIsLoading] = useState(false); // State for loading
  const email = useSelector((state) => state.auth.userInfo.data.email); // Get email from Redux
  const userStatus = useSelector((state) => state.auth.userInfo.data.userStatus); // Get email from Redux

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Handle input changes
  const handleChange = (value, index) => {
    if (/^\d{6}$/.test(value)) {
      // If the user pastes a 6-digit code, update all inputs at once
      setCode(value.split(""));

      // Move focus to the last input field
      setTimeout(() => {
        document.getElementById(`code-${5}`).focus(); // Last box (index 5)
      }, 10);
      return;
    }

    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!code[index] && index > 0) {
        // Move to the previous input if current is empty
        document.getElementById(`code-${index - 1}`).focus();
      }
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      setCode(pastedData.split(""));

      // Move focus to the last input field after pasting
      setTimeout(() => {
        document.getElementById(`code-${5}`).focus(); // Last box (index 5)
      }, 10);
    }
  };




  // Handle Submit Verification
  const handleSubmit = async () => {
    const verificationCode = code.join(""); // Join the code into a single string
    if (verificationCode.length !== 6) {
      alert("Please enter the complete 6-digit verification code.");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await verifycode(email, verificationCode); // API call
      if (response.data) {
        setSuccess("Email verified successfully!");
        setCode(["", "", "", "", "", ""]); // Clear the input boxes
        dispatch(setCredentials({ ...response }));
        navigate("/connect-webflow"); // Redirect to dashboard on successful verification
      } else {
        alert(response.message || "Invalid verification code.");
      }
    } catch (err) {

      setError(err?.response.data.message || "An error occurred while verifying the code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resend Verification Code
  const handleResend = async () => {
    setResendIsLoading(true);
    try {
      const response = await resendVerificationCode(email); // API call

      if (response.data) {
        // toast.success("Verification code has been resent successfully!");
      } else {
        alert(response.message);
      }
    } catch (error) {

      setError("An error occurred while resending the code. Please try again.");
    } finally {
      setResendIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-sm">
        <h1 className="text-center text-xl font-bold text-black-500 mb-4">
          Verify Your Email
        </h1>

        <p className="text-gray-600 mb-4">
          A 6-digit verification code has been sent to your email address:{" "}
          <span className="font-bold">{email}</span>. Please enter it below to
          verify your email. The code will expire in 2 minutes.
        </p>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="flex justify-between mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste} // Attach paste handler
              className="w-10 h-10 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />



          ))}
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </button>

        <button
          onClick={handleResend}
          className="w-full mt-4 py-2 rounded border hover:bg-black-100 text-blue-500"
        >
          {
            resendisLoading ? "Resending Email..." : "Resend Verification Email"
          }
        </button>
      </div>
    </div>
  );
};

export default EmailVerification;
