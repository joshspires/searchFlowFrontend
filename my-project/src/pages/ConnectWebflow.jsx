import React, { useState } from "react";
import { useSelector } from "react-redux";

function ConnectWebflow() {
  const [loading, setLoading] = useState(false);

  const userId = useSelector((state) => state.auth.userInfo.data.userId);
  console.log(userId);


  const handleConnectWebflow = async () => {
    setLoading(true);
    try {
      // Redirect directly to the backend endpoint
      // https://searchflow-ed703fb051f2.herokuapp.com

      const url = `https://dash.searchflow.app/api/webFlowManagementRoutes/connectToWebFlowAccount/${userId}`;

      // const url = `https://searchflow-ed703fb051f2.herokuapp.com/api/webFlowManagementRoutes/connectToWebFlowAccount/${userId}`;
      // const url = `http://localhost:3003/api/webFlowManagementRoutes/connectToWebFlowAccount/${userId}`;
      // console.log("url1", url);

      window.location.href = url;
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Error occurred while connecting to Webflow"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Connect to Webflow
        </h3>
        <p className="text-gray-600 mb-6">
          Seamlessly integrate your Webflow account to unlock advanced features.
        </p>
        <button
          className="bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
          onClick={handleConnectWebflow}
        >
          Connect Your Webflow Account
        </button>
      </div>
    </div>
  );
}

export default ConnectWebflow;
