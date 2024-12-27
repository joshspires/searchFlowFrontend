import React from "react";

const SearchWidgetConf = () => {
  return (
    <div className="flex flex-wrap gap-6 p-3">
      {/* Left Section */}
      <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Instant search widget</h2>
        <div className="space-y-6">
          {/* Search Results Layout */}
          <div>
            <h3 className="text-md font-medium mb-2">Search results layout</h3>
            <div className="space-y-2">
              <div>
                <input type="checkbox" id="twoColumn" className="mr-2" />
                <label htmlFor="twoColumn">Two-column</label>
              </div>
              <div>
                <input type="checkbox" id="oneColumn" className="mr-2" />
                <label htmlFor="oneColumn">One-column</label>
              </div>
            </div>
          </div>

          {/* Search Results Content Ordering */}
          <div>
            <h3 className="text-md font-medium mb-2">
              Search results content ordering
            </h3>
            <div className="flex gap-6">
              {/* Column One */}
              <div className="flex-1">
                <h4 className="text-sm font-semibold mb-2">Column one</h4>
                <div className="border rounded-lg p-4 space-y-2">
                  <p>Section one</p>
                  <p>••• Collection #1 name</p>
                </div>
              </div>

              {/* Column Two */}
              <div className="flex-1">
                <h4 className="text-sm font-semibold mb-2">Column two</h4>
                <div className="border rounded-lg p-4 space-y-2">
                  <p>Section one</p>
                  <p>••• Collection #2 name</p>
                  <p>••• Collection #3 name</p>
                  <p>••• Collection #4 name</p>
                  <p>••• Collection #5 name</p>
                  <p>••• Products</p>
                  <p>Section two</p>
                  <p>••• Pages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Default/no results layout
        </h2>
        <div className="space-y-6">
          {/* Default/No Results Layout */}
          <div>
            <h3 className="text-md font-medium mb-2">
              Default/no results layout
            </h3>
            <div className="space-y-2">
              <div>
                <input type="checkbox" id="twoColumnDefault" className="mr-2" />
                <label htmlFor="twoColumnDefault">Two-column</label>
              </div>
              <div>
                <input type="checkbox" id="oneColumnDefault" className="mr-2" />
                <label htmlFor="oneColumnDefault">One-column</label>
              </div>
              <div>
                <input type="checkbox" id="suggestedTerms" className="mr-2" />
                <label htmlFor="suggestedTerms">Suggested search terms</label>
              </div>
            </div>
          </div>

          {/* Default/No Results Ordering */}
          <div>
            <h3 className="text-md font-medium mb-2">
              Default/no results ordering
            </h3>
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                id="popularSearches"
                className="mt-1 mr-2"
              />
              <label htmlFor="popularSearches">
                Use the most popular searches for search terms
              </label>
            </div>
            <div className="flex gap-6 mt-4">
              {/* Column One */}
              <div className="flex-1">
                <h4 className="text-sm font-semibold mb-2">Column one</h4>
                <div className="border rounded-lg p-4 space-y-2">
                  <p>Section one</p>
                  <p>••• Product 1</p>
                  <p>••• Product 2</p>
                  <p>••• Product 3</p>
                  <p>••• Product 4</p>
                </div>
              </div>

              {/* Column Two */}
              <div className="flex-1">
                <h4 className="text-sm font-semibold mb-2">Column two</h4>
                <div className="border rounded-lg p-4 space-y-2">
                  <p>Suggested Search Terms</p>
                  <p>••• Search term 1</p>
                  <p>••• Search term 2</p>
                  <p>••• Search term 3</p>
                  <p>••• Search term 4</p>
                  <p>••• Search term 5</p>
                  <p>Section one</p>
                  <p>••• Collection item #1 name</p>
                  <p>••• Collection item #2 name</p>
                  <p>••• Collection item #3 name</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWidgetConf;
