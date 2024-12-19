import { useNavigate } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate()

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-96 p-8 bg-white shadow-lg rounded-lg">
          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">searchFlow</h2>
          <p className="text-sm text-center text-gray-600 mb-6">
            Don't have an account? Create one now.
          </p>
  
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
  
          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
  
          {/* Forgot Password */}
          <div className="text-right mb-6">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password? Reset it now.
            </a>
          </div>
  
          {/* Login Button */}
          <button
            onClick={() => navigate("/dashboard")}
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    )
  }
  
  