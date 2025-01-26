import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import WebsiteCard from "../components/WebsiteCard";
import Loader from "../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearDashboardData, setDashboardData } from "../slices/dashboardSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // State for showing the custom alert
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard.data);
  const navigate = useNavigate();


  const connectToEventSource = (retryCount = 0) => {
    const eventSource = new EventSource(
      `https://searchflow-ed703fb051f2.herokuapp.com/api/webFlowManagementRoutes/getDashboardData/${userId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event?.data);

        toast.dismiss();
        if (data.message === "Connection Established") {
          toast.success(data.message);
        }
        if (data?.status === "in-progress") {
          setProgressMessage(
            "Please be patient. Your data is being processed and it might take a few minutes to complete."
          );
        } else if (data?.status === "completed") {
          setProgressMessage("");
          toast.success(data.message);

          dispatch(setDashboardData(data?.data));
          setLoading(false);
          eventSource.close();
        }
      } catch (error) {
        console.warn("Unexpected SSE data format:", event?.data);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setErrorMessage(
        "Failed to fetch data."
      );
      setLoading(false);
      navigate("/connect-webflow")

    };

    return eventSource;
  };

  useEffect(() => {
    if (!dashboardData || dashboardData.length === 0) {
      setLoading(true);
      const eventSource = connectToEventSource();
      return () => {
        eventSource.close();
      };
    }
  }, [userId, dashboardData, dispatch]);

  const handleAddNewWebsite = () => {
    setShowAlert(true);
  };

  const confirmAddWebsite = async () => {
    setShowAlert(false);
    setLoading(true);
    try {
      const url = `https://searchflow-ed703fb051f2.herokuapp.com/api/webFlowManagementRoutes/connectNewWebFlowSite?userId=${userId}`;
      window.location.href = url;
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Error occurred while connecting to Webflow"
      );
    } finally {
      setLoading(false);
      dispatch(clearDashboardData())
    }
  };

  if (loading)
    return (
      <>
        <div className="flex flex-col h-[100vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
          <p className="mt-4 text-center text-lg font-medium text-gray-800">{progressMessage}</p>
        </div>
      </>
    );


  // if (errorMessage)
  //   return (
  //     <div className="text-center flex flex-col justify-center items-center h-[100vh] text-red-500">
  //       <p>{errorMessage}</p>
  //       <button
  //         onClick={() => {
  //           connectToEventSource();
  //         }}
  //         className="border rounded-lg border-red-500 mt-2 px-4 py-2"
  //       >
  //         Retry
  //       </button>
  //     </div>
  //   );

  return (
    <MainLayout>
      <div className="">
        <div className="flex mb-5 items-center justify-between">
          <h2 className="text-2xl font-semibold">Connected Websites</h2>
          <button
            onClick={handleAddNewWebsite}
            className="px-4 py-2 text-white bg-black rounded-md"
          >
            + Add New Website
          </button>
        </div>

        {showAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md space-y-4">
              <h3 className="text-lg font-semibold">Warning</h3>
              <p className="text-gray-700">
                Your existing sites and sites data will be removed from our database. Please select all the sites you want to connect from webflow Oauth.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowAlert(false)}
                  className="px-4 py-2 border rounded-md text-gray-700 border-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAddWebsite}
                  className="px-4 py-2 bg-black text-white rounded-md"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            dashboardData?.map((website) => (
              <WebsiteCard
                key={website.webflowSiteId}
                name={website.websiteName}
                lastSync={new Date(website.lastSync).toLocaleString()}
                collections={website.totalCollections}
                items={website.totalItems}
                products={website.totalProducts}
                webflowSiteId={website.webflowSiteId}
              />
            ))}
        </div>
      </div>
    </MainLayout>
  );
}
