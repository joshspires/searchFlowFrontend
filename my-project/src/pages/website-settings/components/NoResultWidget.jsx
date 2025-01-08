import React, { useState } from "react";
import { searchConfiguration } from "../../../../demo";

const NoResultsLayoutSettings = () => {
  const [showPopularSearches, setShowPopularSearches] = useState(false);
  const [layout, setLayout] = useState("two-column");

  return (
    <div className="p-6 space-y-6">
      {/* Layout Configuration */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Default/No Results Layout
        </h2>
        <div className="space-y-4">
          <div>
            <input
              type="radio"
              id="twoColumn"
              name="noResultsLayout"
              className="mr-2"
              checked={layout === "two-column"}
              onChange={() => setLayout("two-column")}
            />
            <label htmlFor="twoColumn">Two-column</label>
          </div>
          <div>
            <input
              type="radio"
              id="oneColumn"
              name="noResultsLayout"
              className="mr-2"
              checked={layout === "one-column"}
              onChange={() => setLayout("one-column")}
            />
            <label htmlFor="oneColumn">One-column</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="suggestedTerms"
              className="mr-2"
              checked={showPopularSearches}
              onChange={() => setShowPopularSearches(!showPopularSearches)}
            />
            <label htmlFor="suggestedTerms">Suggested search terms</label>
          </div>
        </div>
      </div>

      {/* Layout Preview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">
          Default/No Results Ordering
        </h2>
        <div className="space-y-4">
          <input
            type="checkbox"
            id="usePopularSearches"
            className="mr-2"
            checked={showPopularSearches}
            onChange={() => setShowPopularSearches(!showPopularSearches)}
          />
          <label htmlFor="usePopularSearches">
            Use the most popular searches for search terms
          </label>
        </div>

        {/* Columns Preview */}
        <div className={`flex ${layout === "two-column" ? "gap-6" : ""} mt-6`}>
          {/* Column One */}
          <div className="flex-1">
            <h4 className="text-sm font-semibold mb-2">Column One</h4>
            <div className="border rounded-lg p-4 space-y-2">
              <div>
                <h5 className="text-xs font-bold mb-2">Section One</h5>
                {searchConfiguration?.products?.map((product, index) => (
                  <p key={index}>••• {product}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Column Two */}
          {layout === "two-column" && (
            <div className="flex-1">
              <h4 className="text-sm font-semibold mb-2">Column Two</h4>
              <div className="border rounded-lg p-4 space-y-2">
                {showPopularSearches && (
                  <div>
                    <h5 className="text-xs font-bold mb-2">
                      Suggested Search Terms
                    </h5>
                    {searchConfiguration.siteSearchTerms.map((term, index) => (
                      <p key={index}>••• {term}</p>
                    ))}
                  </div>
                )}
                <div>
                  <h5 className="text-xs font-bold mb-2">Section One</h5>
                  {searchConfiguration?.collections?.map(
                    (collection, index) => (
                      <p key={index}>••• {collection.displayName}</p>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoResultsLayoutSettings;
