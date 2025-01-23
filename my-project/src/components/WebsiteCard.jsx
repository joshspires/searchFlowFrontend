import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function WebsiteCard({ webflowSiteId, name, lastSync, collections, items, products }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Navigate to the website settings page
    navigate(`/connected-websites/settings/${webflowSiteId}`);
  };

  return (
    <div className="flex border border-black flex-col p-4 w-full bg-white rounded-xl w-[339px]">
      <div className="flex justify-between items-center mb-4">
        {/* Card Header */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500 mt-1">Last sync: {lastSync}</p>
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
          Active
        </span>
      </div>

      {/* Stats Section */}
      <div className="flex flex-col gap-3 border border-black rounded-xl p-3 mb-2 ">
        <div className="flex justify-between text-gray-700">
          <span className="text-sm">Total collections:</span>
          <span className="font-medium">{collections}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span className="text-sm">Total items:</span>
          <span className="font-medium">{items}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span className="text-sm">Total products:</span>
          <span className="font-medium">{products}</span>
        </div>
      </div>

      {/* Button */}

      <button onClick={handleNavigate} className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md self-end">
        Settings
      </button>
    </div>
  );
}
