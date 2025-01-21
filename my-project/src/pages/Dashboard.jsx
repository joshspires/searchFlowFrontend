import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import WebsiteCard from "../components/WebsiteCard";
import { getDashboardData } from "../apiManager/webflow";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader";
import { setDashboardData } from "../slices/dashboardSlice";
import { useSearchParams } from "react-router-dom";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  console.log("userId dashboard", userId);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const userId = useSelector((state) => state.auth.userInfo?.data?.userId);
  const dashboardData = useSelector((state) => state.dashboard.data); // Accessing Redux state

  useEffect(() => {

    // Fetch data only if not already available
    (async () => {
      setLoading(true);
      try {
        console.log("userId", userId);
        setTimeout(async () => {
          const res = await getDashboardData(userId);
          dispatch(setDashboardData(res?.data)); // Store data in Redux
        }, 2000);
      } catch (error) {
        console.error(error);
        alert(
          error.response?.data?.message ||
          "Error occurred while fetching the data"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  if (loading) return <Loader />;

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Connected Websites</h2>
          <button className="px-4 py-2 text-white bg-black rounded-md">
            + Add New Website
          </button>
        </div>

        {/* Website Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dashboardData?.map((website, index) => (
            <WebsiteCard
              key={index} // Unique key for each card
              name={website.websiteName}
              lastSync={new Date(website.lastSync).toLocaleString()} // Format date
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
