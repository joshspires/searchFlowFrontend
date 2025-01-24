import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import WebsiteCard from "../components/WebsiteCard";
import Loader from "../common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setDashboardData } from "../slices/dashboardSlice";
import { useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const [loading, setLoading] = useState(false);
  const [progressMessage, setProgressMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const dashboardData = useSelector((state) => state.dashboard.data);

  useEffect(() => {
    if (!dashboardData || dashboardData.length === 0) {
      setLoading(true);

      const eventSource = new EventSource(
        `https://searchflow-ed703fb051f2.herokuapp.com/api/webFlowManagementRoutes/getDashboardData/${userId}`
      );

      eventSource.onmessage = (event) => {
        try {
          // console.log(event.data);

          // Remove "data:" prefix and trim whitespace
          // const rawData = event.data.trim();

          // // Handle plain text messages (e.g., "Connection established")
          // if (!rawData.startsWith("{") && !rawData.startsWith("[")) {
          //   console.log("Message from server:", rawData);
          //   return;
          // }

          // // Parse JSON messages
          // console.log("dsdas", event.data);
          // const data = extractDetailedData(event.data)
          const data = JSON.parse(event?.data);
          console.log("data", data);

          if (data?.status === "in-progress") {
            // setProgressMessage((prev) => Math.min(prev + 10, 100)); // Example: increment progress
            console.log(data?.status);

            // setStatus(data.message);
          } else if (data?.status === "completed") {
            // setProgressMessage(100);
            // setStatus(data.message);
            console.log(data?.status);

            setDashboardData(data.data);
            eventSource.close(); // Close the connection
          }
        } catch (error) {
          console.error("Error parsing SSE data:", error, event.data);
        }
      };

      eventSource.onerror = (err) => {
        console.error("SSE connection error:", err);
        setErrorMessage("Failed to fetch data. Please try again later.");
        setLoading(false);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
  }, [userId, dashboardData, dispatch]);

  // if (loading)
  //   return (
  //     <Loader>
  //       {progressMessage && (
  //         <p className="mt-4 text-center text-black">{progressMessage}</p>
  //       )}
  //     </Loader>
  //   );

  if (errorMessage)
    return (
      <div className="text-center text-red-500">
        <p>{errorMessage}</p>
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
              key={website.webflowSiteId} // Use webflowSiteId as a unique key
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
function extractDetailedData(data) {
  // Split the data into lines
  const lines = data.split("\n").filter(line => line.trim());
  let dashboardData = null;

  lines.forEach(line => {
    if (line.startsWith("data:")) {
      const content = line.slice(5).trim(); // Remove "data: " prefix
      try {
        const parsedContent = JSON.parse(content);
        if (parsedContent.status === "completed" && parsedContent.data) {
          dashboardData = parsedContent; // Capture the detailed JSON
        }
      } catch (error) {
        // Skip lines that are not JSON
      }
    }
  });

  if (dashboardData) {
    console.log("Detailed Dashboard Data:", JSON.stringify(dashboardData, null, 2));
  } else {
    console.log("No detailed dashboard data found.");
  }
}