import * as React from "react";
import { useForm } from "react-hook-form";

export default function AccountSetting() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex border border-black rounded-lg flex-col items-start p-6 mt-4 w-full bg-white "
    >
      <div className="w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h2>
        <div className="grid grid-cols-1 gap-2 md:gap-4 sm:grid-cols-2">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-1 text-sm font-medium text-gray-800">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: "First name is required" })}
              className="w-full px-4 py-3 text-gray-700 bg-white border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm mt-1">{errors.firstName.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3 text-gray-700 bg-white border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label htmlFor="newPassword" className="mb-1 text-sm font-medium text-gray-800">
              New password
            </label>
            <input
              type="password"
              id="newPassword"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-3 text-gray-700 bg-white border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.newPassword && (
              <span className="text-red-500 text-sm mt-1">{errors.newPassword.message}</span>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium text-gray-800">
              Confirm new password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              className="w-full px-4 py-3 text-gray-700 bg-white border border-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end items-center">

          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-gray-800 text-white font-medium rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}
