import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import WebsiteCard from "../components/WebsiteCard";
import Loader from "../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardData } from "../slices/dashboardSlice";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard.data);

  const connectToEventSource = (retryCount = 0) => {
    const MAX_RETRIES = 5;
    const RETRY_DELAY = Math.min(1000 * 2 ** retryCount, 30000);

    const eventSource = new EventSource(
      `https://searchflow-ed703fb051f2.herokuapp.com/api/webFlowManagementRoutes/getDashboardData/${userId}`
    );

    console.log("eventSource", eventSource);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event?.data);
        console.log("event", data);
        // toast.dismiss()
        toast.success(data.message)

        if (data?.status === "in-progress") {
          setProgressMessage(data.message || `Progress: ${data.progress || 0}%`);
          toast.success(data.progress)
          console.log("data.progress", data.progress);

          // toast.dismiss()

          toast.success(data.message)

        } else if (data?.status === "completed") {
          setProgressMessage("Data Loaded Successfully!");
          console.log(progressMessage);
          // toast.dismiss()
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
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => connectToEventSource(retryCount + 1), RETRY_DELAY);
      } else {
        setErrorMessage("Failed to fetch data after multiple attempts. Please try again later.");
        setLoading(false);
      }
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
      <Loader>
        {progressMessage && (
          <p className="mt-4 text-center text-black">{progressMessage}</p>
        )}
      </Loader>
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
          <button className="px-4 py-2 text-white bg-black rounded-md">
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
