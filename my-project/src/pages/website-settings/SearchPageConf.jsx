import React from "react";

const SearchPageConf = () => {
  return (
    <div className="flex flex-col p-3 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Search results page</h2>
        <div className="space-y-6">
          {/* Search Results Layout */}
          <div>
            <h3 className="text-md font-medium mb-2">Search results layout</h3>
            <div className="space-y-2">
              <div>
                <input type="checkbox" id="oneTab" className="mr-2" />
                <label htmlFor="oneTab">One tab</label>
              </div>
              <div>
                <input type="checkbox" id="twoTabs" className="mr-2" />
                <label htmlFor="twoTabs">Two tabs</label>
              </div>
              <div>
                <input type="checkbox" id="threeTabs" className="mr-2" />
                <label htmlFor="threeTabs">Three tabs</label>
              </div>
            </div>
          </div>

          {/* Search Results Content Ordering */}
          <div>
            <h3 className="text-md font-medium mb-2">
              Search results content ordering
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Tab One */}
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-2">Tab one</h4>
                <p>Content</p>
                <p>••• Collect #1</p>
                <p>••• Collect #4</p>
                <p>••• Collect #2</p>
              </div>

              {/* Column Two */}
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-2">Column two</h4>
                <p>Content</p>
                <p>••• Products</p>
              </div>

              {/* Column Three */}
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-2">Column three</h4>
                <p>Content</p>
                <p>••• Collect #5</p>
                <p>••• Collect #3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-md font-medium mb-4">
          No results content ordering
        </h3>
        <div className="space-y-4">
          {/* Suggested Search Terms */}
          <div>
            <input type="checkbox" id="suggestedSearchTerms" className="mr-2" />
            <label htmlFor="suggestedSearchTerms">Suggested search terms</label>
          </div>
          {/* Popular Searches */}
          <div>
            <input type="checkbox" id="popularSearches" className="mr-2" />
            <label htmlFor="popularSearches">
              Use the most popular searches for search terms
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-4">
          {/* Column One */}
          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2">
              Suggested Search Terms
            </h4>
            <p>••• Search term 1</p>
            <p>••• Search term 2</p>
            <p>••• Search term 3</p>
            <p>••• Search term 4</p>
            <p>••• Search term 5</p>
          </div>

          {/* Column Two */}
          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-2">Section one</h4>
            <p>••• Product 1</p>
            <p>••• Product 2</p>
            <p>••• Product 3</p>
            <p>••• Product 4</p>
            <h4 className="text-sm font-semibold mt-4">Section two</h4>
            <p>••• Collection item #5 name</p>
            <p>••• Collection item #5 name</p>
            <p>••• Collection item #5 name</p>
            <p>••• Collection item #5 name</p>
            <p>••• Collection item #5 name</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPageConf;
