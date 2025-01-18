import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import WebsiteCard from "../components/WebsiteCard";
import { getDashboardData } from "../apiManager/webflow";
import { useSelector } from "react-redux";
import Loader from "../common/Loader";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const userId = useSelector((state) => state.auth.userInfo?.data?.userId);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getDashboardData(userId);
        setData(res.data); // Set data from the response
      } catch (error) {
        console.log(error); 
        alert(
          error.response?.data?.message ||
            "Error occurred while fetching the data"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {data.map((website, index) => (
            <WebsiteCard
              key={index} // Unique key for each card
              name={website.websiteName}
              lastSync={new Date(website.lastSync).toLocaleString()} // Format date
              collections={website.totalCollections}
              items={website.totalItems}
              products={website.totalProducts}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
