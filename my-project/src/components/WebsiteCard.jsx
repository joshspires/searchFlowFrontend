import * as React from "react";

export default function WebsiteCard({ name, lastSync, collections, items, products }) {
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-300 shadow-md w-[339px]">
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
      <div className="flex flex-col gap-3 mb-4">
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
      <button className="px-4 py-2 text-sm font-medium text-white bg-black hover:bg-gray-800 rounded-md self-end">
        Settings
      </button>
    </div>
  );
}
