import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import WebsiteCard from "../components/WebsiteCard";
import { getDashboardData } from "../apiManager/webflow";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.auth.userInfo.data.userId);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getDashboardData(userId);
        console.log(data);
      } catch (error) {
        alert(error.response.data.message || "error occured while fetching the data")
      } finally {
        setLoading(false);
      }
    })()
  },[])

  if (loading) return <div>loading...</div>
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
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          <WebsiteCard
            name="Website #1 Name"
            lastSync="5 hours ago"
            collections="12"
            items="340"
            products="45"
          />
          <WebsiteCard
            name="Website #2 Name"
            lastSync="2 hours ago"
            collections="10"
            items="250"
            products="30"
          />
        </div>
      </div>
    </MainLayout>
  );
}
