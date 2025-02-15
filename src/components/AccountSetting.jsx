import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../apiManager/setting";
import { setCredentials } from "../slices/authSlice";
import toast from "react-hot-toast";

export default function AccountSetting() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { userInfo } = useSelector((state) => state.auth);
  const email = userInfo?.data.email;
  const userName = userInfo?.data.username;
  const userId = userInfo?.data.userId;
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);


  React.useEffect(() => {
    if (email) {
      setValue("email", email);
    }
    if (userName) {
      setValue("firstName", userName);
    }
  }, [email, userName, setValue]);

  const watchedFields = watch(["firstName", "email", "newPassword", "confirmPassword"]);

  // Determine if there are changes
  const hasChanges =
    watchedFields[0]?.trim() || // firstName
    (watchedFields[1]?.trim() && watchedFields[1] !== email) || // email
    watchedFields[2]?.trim(); // newPassword

  const onSubmit = async (data) => {
    const formattedData = {};
    if (data.firstName) {
      formattedData.userName = `${data.firstName}`.trim();
    }
    if (data.email && data.email !== email) {
      formattedData.email = data.email;
    }
    if (data.newPassword) {
      formattedData.password = data.newPassword;
    }

    if (Object.keys(formattedData).length === 0) {
      console.log("No changes to update.");
      return;
    }

    try {
      setIsLoading(true); // Set loading state
      const response = await updateUser(userId, formattedData);
      console.log("Update Response:", response);
      toast.dismiss()
      toast.success(response?.message)
      // Update the store with the new email and isEmailVerified values
      if (response) {
        const modifiedResponse = {
          ...response,
          data: {
            ...response.data,
            username: response.data.userName,
            userId: response.data._id, // Add userId alongside _id
            webflowAccessToken: userInfo?.data.webflowAccessToken,
            token: userInfo?.data.token
          },
        };

        dispatch(
          setCredentials({
            ...modifiedResponse, // Include all the fields from the modified response
            email: modifiedResponse.data.email,
            isEmailVerified: modifiedResponse.data.isEmailVerified,
          })
        );
      }

      // Reset the form to default or updated values
      reset({
        firstName: response?.data?.username || userName,
        email: response?.data.email || email,
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex border border-secondary rounded flex-col items-start p-6 mt-5 w-full bg-white"
    >
      <div className="w-full">
        <h2 className="text-lg font-semibold text-primary font-bitter mb-4">Account Details</h2>
        <div className="grid grid-cols-1 gap-2 md:gap-4 sm:grid-cols-2">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-1 text-sm font-medium text-gray-800">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              defaultValue={userName} // Set the default value
              {...register("firstName")}
              className="w-full px-4 py-3 text-gray-700 bg-white border border-secondary rounded outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue={email} // Set the default value
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-3 text-gray-700 bg-white border border-secondary rounded outline-none"
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
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                {...register("newPassword", {
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-secondary rounded outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showNewPassword ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" /></svg>}
              </button>
            </div>
            {errors.newPassword && (
              <span className="text-red-500 text-sm mt-1">{errors.newPassword.message}</span>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="mb-1 text-sm font-medium text-gray-800">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
                className="w-full px-4 py-3 text-gray-700 bg-white border border-secondary rounded outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              >
                {showConfirmPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" /><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" /><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" /><path d="m2 2 20 20" /></svg>}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>
            )}
          </div>

        </div>
        <div className="w-full flex justify-end items-center">
          <button
            type="submit"
            className={`mt-4 px-6 py-2 w-[150px] flex justify-center items-center text-white font-medium rounded focus:outline-none focus:ring-2 ${isLoading || !hasChanges
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-primary focus:ring-blue-400"
              }`}
            disabled={isLoading || !hasChanges}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                ></path>
              </svg>
            ) : (
              "Save Changes"
            )}
          </button>

        </div>
      </div>
    </form>
  );
}
