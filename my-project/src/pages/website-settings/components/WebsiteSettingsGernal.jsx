import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { collections } from "../../../../demo";

const WebsiteSettingsGernal = () => {
  const { register, control, getValues, setValue, watch } = useFormContext();

  // Watch the searchFrom field
  const searchFrom = useWatch({
    control,
    name: "searchFrom", // Specify the field to watch
  });

  // Watch specific fields for toggles and snippet
  const fuzzySearch = watch("searchEngineSettings.fuzzySearch");
  const instantSearchWidget = watch("searchEngineSettings.instantSearchWidget");

  // Handle toggle change manually for visual sync
  const handleToggleChange = (field) => {
    setValue(field, !getValues(field), { shouldDirty: true });
  };

  return (
    <div className="flex flex-wrap gap-4 mx-2 mb-4">
      {/* Left Section */}
      <div className="flex-1 bg-white border border-black rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Select what appears in search
        </h2>
        <div className="space-y-4">
          {/* Collections */}
          <div>
            <h3 className="text-md font-medium mb-2">Collections</h3>
            <div className="space-y-2">
              {collections.map((item) => (
                <div key={item._id}>
                  <input
                    type="checkbox"
                    id={item._id}
                    className="mr-2 accent-black"
                    {...register("searchFrom.collections")}
                    value={item._id}
                  />
                  <label htmlFor={item._id}>{item.displayName}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-md font-medium mb-2">Pages</h3>
            <div>
              <input
                type="checkbox"
                id="allPages"
                className="mr-2 accent-black"
                {...register("searchFrom.allPages")}
              />
              <label htmlFor="allPages">All pages</label>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-md font-medium mb-2">Products {"{website name}"}</h3>
            <div>
              <input
                type="checkbox"
                id="allProducts"
                className="mr-2 accent-black"
                {...register("searchFrom.allProducts")}
              />
              <label htmlFor="allProducts">All products</label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white rounded-xl p-6 border border-black">
        <h2 className="text-lg font-semibold mb-4">Search engine settings</h2>
        <div className="space-y-4">
          {/* Toggles */}
          <div className="flex flex-col gap-4">
            {/* Fuzzy Search Toggle */}
            <label className="relative rounded-full inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="fuzzySearch"
                className="sr-only peer"
                {...register("searchEngineSettings.fuzzySearch")}
                checked={!!fuzzySearch} // Ensure a boolean value
                onChange={() => handleToggleChange("searchEngineSettings.fuzzySearch")}
              />
              <div
                className={`w-12 h-6 ${fuzzySearch ? "bg-green-500" : "bg-gray-300"} rounded-full transition`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow transform transition ${fuzzySearch ? "translate-x-6" : "translate-x-0"}`}
                ></div>
              </div>
              <span className="ml-3 text-md font-medium">Fuzzy search</span>
            </label>

            {/* Instant Search Widget Toggle */}
            <label className="relative rounded-full inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="instantSearch"
                className="sr-only peer"
                {...register("searchEngineSettings.instantSearchWidget")}
                checked={!!instantSearchWidget} // Ensure a boolean value
                onChange={() => handleToggleChange("searchEngineSettings.instantSearchWidget")}
              />
              <div
                className={`w-12 h-6 ${instantSearchWidget ? "bg-green-500" : "bg-gray-300"} rounded-full transition`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow transform transition ${instantSearchWidget ? "translate-x-6" : "translate-x-0"}`}
                ></div>
              </div>
              <span className="ml-3 text-md font-medium">Instant search widget</span>
            </label>

          </div>

          {/* Code Snippet */}
          <div>
            <h3 className="text-md font-medium mb-2">
              Add this snippet into the &lt;head&gt; section.
            </h3>
            <textarea
              className="w-full border min-h-[130px] max-h-[130px] outline-none border-black rounded-lg p-2 text-sm resize-none"
              rows={2}
              placeholder="Enter your code snippet here..."
              {...register("searchEngineSettings.codeSnippet")}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSettingsGernal;
