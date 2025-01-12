import React from "react";
import { useFormContext } from "react-hook-form";
import { collections, searchConfiguration } from "../../../../demo";

const WebsiteSettingsGernal = () => {
  const { register, getValues, setValue, watch } = useFormContext({
    values: {
      ...searchConfiguration,
    },
  });
  const handleCollectionChange = (id) => {
    const currentValues = getValues("searchFrom.collections") || [];
    let updatedValues;

    if (currentValues.includes(id)) {
      updatedValues = currentValues.filter((existingId) => existingId !== id);
    } else {
      updatedValues = [...currentValues, id];
    }

    setValue("searchFrom.collections", updatedValues);
  };

  return (
    <div className="flex flex-wrap gap-6 mx-2 mb-2 ">
      {/* Left Section */}
      <div className="flex-1 bg-white border border-black rounded-lg  p-6">
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
                    checked={watch("searchFrom.collections")?.includes(item._id)}
                    onChange={() => handleCollectionChange(item._id)}
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
                checked={watch("searchFrom.allPages")}
                onChange={(e) => {
                  setValue("searchFrom.allPages", e.target.checked);
                }}
              />
              <label htmlFor="allPages">All pages</label>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-md font-medium mb-2">
              Products {"{website name}"}
            </h3>
            <div>
              <input
                type="checkbox"
                id="allProducts"
                className="mr-2 accent-black"
                checked={watch("searchFrom.allProducts")}
                onChange={(e) => {
                  setValue("searchFrom.allProducts", e.target.checked);
                }}
              />
              <label htmlFor="allProducts">All products</label>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1  bg-white rounded-lg p-6 border border-black">
        <h2 className="text-lg font-semibold mb-4">Search engine settings</h2>
        <div className="space-y-4">
          {/* Toggles */}
          <div className="flex flex-col gap-4">
            <label className="relative rounded-full  inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="fuzzySearch"
                className="sr-only peer"
                checked={watch("searchEngineSettings.fuzzySearch")}
                onChange={(e) => setValue("searchEngineSettings.fuzzySearch", e.target.checked)}
              />
              <div className={`w-12 h-6 bg-green-300 rounded-full ${watch("searchEngineSettings.fuzzySearch") ? '' : ''}`}>
                <div
                  className={`w-6 h-6 bg-green-700 rounded-full shadow transform transition ${watch("searchEngineSettings.fuzzySearch") ? 'translate-x-6' : ''}`}
                ></div>
              </div>
              <span className="ml-3 text-md font-medium">Fuzzy search</span>
            </label>

            <label className="relative rounded-full border-green-400 inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="instantSearch"
                className="sr-only peer"
                checked={watch("searchEngineSettings.instantSearchWidget")}
                onChange={(e) => setValue("searchEngineSettings.instantSearchWidget", e.target.checked)}
              />
              <div className={`w-12 h-6 bg-green-300 rounded-full ${watch("searchEngineSettings.instantSearchWidget") ? '' : ''}`}>
                <div
                  className={`w-6 h-6 bg-green-700 rounded-full shadow transform transition ${watch("searchEngineSettings.instantSearchWidget") ? 'translate-x-6' : ''}`}
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
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSettingsGernal;
