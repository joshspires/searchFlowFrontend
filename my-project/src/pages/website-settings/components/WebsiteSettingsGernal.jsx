import React from "react";
import { useFormContext } from "react-hook-form";
import { collections, searchConfiguration } from "../../../../demo";

const WebsiteSettingsGernal = () => {
  const { register, getValues, setValue, watch } = useFormContext({
    values: {
      ...searchConfiguration,
    },
  });
  return (
    <div className="flex flex-wrap gap-6 p-3 ">
      {/* Left Section */}
      <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
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
                    className="mr-2"
                    checked={watch("searchFrom.collections")?.includes(
                      item._id
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setValue("collections", [
                          ...getValues("collections"),
                          item._id,
                        ]); // Add the ID
                      } else {
                        setValue(
                          "collections",
                          getValues("collections").filter(
                            (id) => id !== item._id
                          ) // Remove the ID
                        );
                      }
                    }}
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
                className="mr-2"
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
                className="mr-2"
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
      <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Search engine settings</h2>
        <div className="space-y-4">
          {/* Toggles */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fuzzySearch"
              className="mr-2 h-5 w-5 text-green-500 focus:ring-0 focus:ring-offset-0"
              defaultChecked
              checked={watch("searchEngineSettings.fuzzySearch")}
              onChange={(e) => {
                setValue("searchEngineSettings.fuzzySearch", e.target.checked);
              }}
            />
            <label htmlFor="fuzzySearch" className="text-md font-medium">
              Fuzzy search
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="instantSearch"
              className="mr-2 h-5 w-5 text-green-500 focus:ring-0 focus:ring-offset-0"
              checked={watch("searchEngineSettings.instantSearchWidget")}
              onChange={(e) => {
                setValue(
                  "searchEngineSettings.instantSearchWidget",
                  e.target.checked
                );
              }}
            />
            <label htmlFor="instantSearch" className="text-md font-medium">
              Instant search widget
            </label>
          </div>

          {/* Code Snippet */}
          <div>
            <h3 className="text-md font-medium mb-2">
              Add this snippet into the &lt;head&gt; section.
            </h3>
            <textarea
              className="w-full border rounded-lg p-2 text-sm"
              rows={3}
              placeholder="Enter your code snippet here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSettingsGernal;
