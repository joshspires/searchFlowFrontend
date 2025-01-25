import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import WebsiteCard from "../components/WebsiteCard";
import Loader from "../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardData } from "../slices/dashboardSlice";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { connectNewWebFlowSite } from "../apiManager/setting";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard.data);

  const connectToEventSource = (retryCount = 0) => {

    const eventSource = new EventSource(
      `https://searchflow-ed703fb051f2.herokuapp.com/api/webFlowManagementRoutes/getDashboardData/${userId}`
    );

    console.log("eventSource", eventSource);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event?.data);
        console.log("event", data);
        toast.dismiss()
        toast.success(data.message)
        if (data?.status === "in-progress") {
          setProgressMessage("Please be patient. Your data is being processed and it might take few minutes to completed");
        } else if (data?.status === "completed") {
          setProgressMessage("Data Loaded Successfully!");
          console.log(progressMessage);
          toast.dismiss()
          toast.success(data.message)
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
      setErrorMessage("Failed to fetch data after multiple attempts. Please try again later.");
      setLoading(false);
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

  if (loading)
    return (
      <>
        <p className="mt-4 text-center text-black">{progressMessage}</p>
        <Loader />
      </>
    );

  if (errorMessage)
    return (
      <div className="text-center flex flex-col justify-center items-center  h-[100vh] text-red-500">
        <p>{errorMessage}</p>
        <button onClick={() => { connectToEventSource() }} className="border rounded-lg border-red-500 mt-2 px-4 py-2">Retry</button>
      </div>
    );

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Connected Websites</h2>
          <button
            onClick={async () => {
              setLoading(true);
              try {
                // Redirect directly to the backend endpoint
                // await connectNewWebFlowSite(userId)
                // console.log("url", url);
                const url = `https://searchflow-ed703fb051f2.herokuapp.com/api/webFlowManagementRoutes/connectNewWebFlowSite?userId=${userId}`;
                // const url = `http://localhost:3003/api/webFlowManagementRoutes/connectToWebFlowAccount/${userId}`;
                window.location.href = url;
              } catch (error) {
                alert(
                  error.response?.data?.message ||
                  "Error occurred while connecting to Webflow"
                );
              } finally {
                setLoading(false);
              }
            }}
            className="px-4 py-2 text-white bg-black rounded-md"
          >
            + Add New Website
          </button>


        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardData?.map((website, index) => (
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