import React from "react";

const WebsiteSettingsGernal = () => {
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
              <div>
                <input type="checkbox" id="collection1" className="mr-2" />
                <label htmlFor="collection1">Collection #1 name</label>
              </div>
              <div>
                <input type="checkbox" id="collection2" className="mr-2" />
                <label htmlFor="collection2">Collection #2 name</label>
              </div>
              <div>
                <input type="checkbox" id="collection3" className="mr-2" />
                <label htmlFor="collection3">Collection #3 name</label>
              </div>
              <div>
                <input type="checkbox" id="collection4" className="mr-2" />
                <label htmlFor="collection4">Collection #4 name</label>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-md font-medium mb-2">Pages</h3>
            <div>
              <input type="checkbox" id="allPages" className="mr-2" />
              <label htmlFor="allPages">All pages</label>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-md font-medium mb-2">
              Products {"{website name}"}
            </h3>
            <div>
              <input type="checkbox" id="allProducts" className="mr-2" />
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
              defaultChecked
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
