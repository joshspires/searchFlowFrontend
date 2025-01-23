import React, { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
// import { collections } from "../../../../demo";

const WebsiteSettingsGernal = ({ siteData, siteId }) => {
  const { register, control, getValues, setValue, watch } = useFormContext();
  const { siteCollections, siteProducts } = siteData;
  const userId = useSelector((state) => state.auth.userInfo?.data?.userId);
  const textAreaRef = useRef(null); // Reference to the textarea

  // Watch the searchFrom field
  const searchFrom = useWatch({
    control,
    name: "searchFrom", // Specify the field to watch
  });


  // Function to copy the text from the textarea
  const handleCopy = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand('copy'); // or use navigator.clipboard.writeText(textAreaRef.current.value);
      alert('Code copied to clipboard!');
    }
  };
  // Watch specific fields for toggles and snippet
  const fuzzySearch = watch("searchEngineSettings.fuzzySearch");
  const instantSearchWidget = watch("searchEngineSettings.instantSearchWidget");

  // Handle toggle change manually for visual sync
  const handleToggleChange = (field) => {
    setValue(field, !getValues(field), { shouldDirty: true });
  };
  const codeSnippet = `
<div id="searchWidget" style="display: none;">
  <button id="closeButton" style="position: absolute; top: 10px; right: 10px; background: red; color: white; border: none; padding: 10px 15px; cursor: pointer; border-radius: 5px;">Close</button>
  <div id="root">
    <p>Widget loaded for siteId: ${siteId}</p>
  </div>
  <a id="viewAllButton" href="#" target="_blank" style="margin-top: 20px; background: blue; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px; display: inline-block; text-align: center; text-decoration: none;">View All Results</a>
</div>

<!-- Static CSS -->
<link rel="stylesheet" href="https://abrar341.github.io/search/widget.css" />

<script defer>
  (function () {
    const userId = "${userId}";
    const siteId = "${siteId}";

    if (!userId || !siteId) {
      console.error("userId or siteId not found.");
      return;
    }

    const SearchFlowWidget = {
      init: function (config) {
        if (!config.siteId || !config.userId) {
          console.error("SearchFlowWidget: Missing required configuration fields.");
          return;
        }
        console.log("SearchFlowWidget initialized with config:", config);
        this.loadWidget(config);
      },
      loadWidget: function (config) {
        const rootElement = document.getElementById("root");
        if (!rootElement) {
          console.error("Root element not found.");
          return;
        }
        rootElement.innerHTML = \`<p>Widget loaded for siteId: \${config.siteId}</p>\`;
      },
    };

    window.SearchFlowWidget = SearchFlowWidget;
    window.appConfig = { userId, siteId };

    // DOMContentLoaded Event
    document.addEventListener("DOMContentLoaded", function () {
      const widget = document.getElementById("searchWidget");
      const button = document.getElementById("searchWidgetButton");
      const closeButton = document.getElementById("closeButton");
      const viewAllButton = document.getElementById("viewAllButton");
      const searchInput = document.getElementById("searchWidgetInput"); // Using the complex CSS selector

      if (!button) {
        console.error("SearchWidgetButton not found.");
        return;
      }

      // Toggle Widget Display
      button.addEventListener("click", function () {
        widget.style.display = widget.style.display === "none" ? "block" : "none";
      });

      // Close Widget
      if (closeButton) {
        closeButton.addEventListener("click", function () {
          widget.style.display = "none";
        });
      }

      // Update View All Button URL
      if (viewAllButton && searchInput) {
        // Update the button dynamically when typing
        searchInput.addEventListener("input", function () {
          const query = searchInput.value.trim();
          viewAllButton.href = query
            ? \`https://searchflow-test---search.webflow.io/search?q=\${encodeURIComponent(query)}\`
            : "#";
        });

        // Handle button click if needed
        viewAllButton.addEventListener("click", function (event) {
          if (!searchInput.value.trim()) {
            alert("Please enter a search query.");
            event.preventDefault();
          }
        });
      } else {
        console.error("Search input or View All button not found.");
      }
    });
  })();
</script>

<!-- Static JS -->
<script defer src="https://abrar341.github.io/search/widget.iife.js"></script>
`;



  return (
    <div className="flex flex-col md:flex-row gap-4 mx-2 mb-4">
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
              {siteCollections?.map((item) => (
                <div key={item._id}>
                  <input
                    type="checkbox"
                    id={item._id}
                    className="mr-2 accent-black"
                    {...register("searchFrom.collections")}
                    value={item._id}
                    onChange={(e) => {
                      const isChecked = e.target.checked;

                      // Get the current values of the fields
                      const currentOrder = getValues("instantSearchWidgetCustomization.searchResultContentOrdering");
                      const currentDefaultOrNoResultOrder = getValues("instantSearchWidgetCustomization.defaultOrNoResultOrdering");
                      const currentDNoResultOrder = getValues("searchResultPageCustomization.noResultOrdering");
                      const currentTabOrder = getValues("searchResultPageCustomization.searchResultContentOrdering");

                      if (isChecked) {
                        // Add selected collection to `searchResultContentOrdering`
                        setValue(
                          "instantSearchWidgetCustomization.searchResultContentOrdering",
                          [
                            ...currentOrder,
                            {
                              column: "columnTwo",
                              section: "sectionOne",
                              sectionType: "Collections",
                              type: "Collections",
                              id: item._id,
                              order: currentOrder.length + 1, // Set order as the last position
                              // _id: `${item._id}-custom`, // Generate a unique ID for new entries
                            },
                          ],
                          { shouldDirty: true }
                        );

                        // Add selected collection to `defaultOrNoResultOrdering`
                        setValue(
                          "instantSearchWidgetCustomization.defaultOrNoResultOrdering",
                          [
                            ...currentDefaultOrNoResultOrder,
                            {
                              column: "columnTwo",
                              section: "sectionOne",
                              sectionType: "Collections",
                              type: "Collections",
                              id: item._id,
                              order: currentDefaultOrNoResultOrder.length + 1, // Set order as the last position
                              // _id: `${item._id}-default`, // Generate a unique ID for new entries
                            },
                          ],
                          { shouldDirty: true }
                        );

                        // Add selected collection to `defaultOrNoResultOrdering`
                        setValue(
                          "searchResultPageCustomization.noResultOrdering",
                          [
                            ...currentDNoResultOrder,
                            {
                              column: "columnTwo",
                              section: "sectionTwo",
                              sectionType: "Collections",
                              type: "Collections",
                              id: item._id,
                              order: currentDNoResultOrder.length + 1, // Set order as the last position
                              // _id: `${item._id}-default`, // Generate a unique ID for new entries
                            },
                          ],
                          { shouldDirty: true }
                        );
                        setValue(
                          "searchResultPageCustomization.searchResultContentOrdering",
                          [
                            ...currentTabOrder,
                            {
                              tabName: "Collections",
                              tabNumber: "one",
                              // sectionType: "Collections",
                              type: "Collections",
                              id: item._id,
                              order: currentTabOrder.length + 1, // Set order as the last position
                              // _id: `${item._id}-default`, // Generate a unique ID for new entries
                            },
                          ],
                          { shouldDirty: true }
                        );
                      } else {
                        // Remove collection from `searchResultContentOrdering`
                        setValue(
                          "instantSearchWidgetCustomization.searchResultContentOrdering",
                          currentOrder.filter((entry) => entry.id !== item._id),
                          { shouldDirty: true }
                        );

                        // Remove collection from `defaultOrNoResultOrdering`
                        setValue(
                          "instantSearchWidgetCustomization.defaultOrNoResultOrdering",
                          currentDefaultOrNoResultOrder.filter((entry) => entry.id !== item._id),
                          { shouldDirty: true }
                        );
                        setValue(
                          "searchResultPageCustomization.noResultOrdering",
                          currentDNoResultOrder.filter((entry) => entry.id !== item._id),
                          { shouldDirty: true }
                        );

                        setValue(
                          "searchResultPageCustomization.searchResultContentOrdering",
                          currentTabOrder.filter((entry) => entry.id !== item._id),
                          { shouldDirty: true }
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
              <div>
                <input
                  type="checkbox"
                  id="allPages"
                  className="mr-2 accent-black"
                  {...register("searchFrom.allPages")}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const currentOrder = getValues(
                      "instantSearchWidgetCustomization.searchResultContentOrdering"
                    );
                    const currentTabOrder = getValues("searchResultPageCustomization.searchResultContentOrdering");

                    if (isChecked) {
                      // Add all sitePages to `searchResultContentOrdering`
                      const pagesToAdd = siteData.sitePages.map((page, index) => ({
                        column: "columnTwo",
                        section: "sectionTwo",
                        sectionType: "Pages",
                        type: "Pages",
                        id: page._id,
                        order: index + 1, // Incremental order starting from 1
                      }));
                      const pagesToAdd1 = siteData.sitePages.map((page, index) => ({
                        tabName: "Pages",
                        tabNumber: "three",
                        // sectionType: "Pages",
                        type: "Pages",
                        id: page._id,
                        order: index + 1, // Incremental order starting from 1
                      }));

                      setValue(
                        "searchResultPageCustomization.searchResultContentOrdering",
                        [...currentTabOrder, ...pagesToAdd1],
                        { shouldDirty: true }
                      );
                      setValue(
                        "instantSearchWidgetCustomization.searchResultContentOrdering",
                        [...currentOrder, ...pagesToAdd],
                        { shouldDirty: true }
                      );


                    } else {
                      // Remove all entries with `type` === "Pages" from `searchResultContentOrdering`
                      const updatedOrder = currentOrder.filter(
                        (entry) => entry.type !== "Pages"
                      );
                      const updatedOrder1 = currentTabOrder.filter((entry) => entry.tabName !== "Pages");

                      setValue(
                        "instantSearchWidgetCustomization.searchResultContentOrdering",
                        updatedOrder,
                        { shouldDirty: true }
                      );
                      setValue(
                        "searchResultPageCustomization.searchResultContentOrdering",
                        updatedOrder1,
                        { shouldDirty: true }
                      );
                    }
                  }}
                />
                <label htmlFor="allPages">All pages</label>
              </div>

            </div>
          </div>
          {/* Products */}
          <div>
            <div>
              <h3 className="text-md font-medium mb-2">Products</h3>
              <div>
                <div>
                  <input
                    type="checkbox"
                    id="allProducts"
                    className="mr-2 accent-black"
                    {...register("searchFrom.allProducts")}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const currentOrder = getValues("instantSearchWidgetCustomization.searchResultContentOrdering");
                      const currentDefaultOrNoResultOrder = getValues("instantSearchWidgetCustomization.defaultOrNoResultOrdering");
                      const currentDNoResultOrder = getValues("searchResultPageCustomization.noResultOrdering");
                      const currentTabOrder = getValues("searchResultPageCustomization.searchResultContentOrdering");

                      if (isChecked) {
                        // Add all siteProducts of type "Products" to searchResultContentOrdering
                        const productsToAdd = siteData.siteProducts
                          .map((product, index) => ({
                            column: "columnOne",
                            section: "sectionOne",
                            sectionType: "Products",
                            type: "Products",
                            id: product._id,
                            order: currentOrder.length + index + 1, // Incremental order based on current length
                          }));

                        // Add all siteProducts of type "Products" to defaultOrNoResultOrdering
                        const productsToAdd1 = siteData.siteProducts
                          .map((product, index) => ({
                            column: "columnOne",
                            section: "sectionOne",
                            sectionType: "Products",
                            type: "Products",
                            id: product._id,
                            order: currentDefaultOrNoResultOrder.length + index + 1, // Incremental order
                          }));

                        // Add all siteProducts of type "Products" to noResultOrdering
                        const productsToAdd2 = siteData.siteProducts
                          .map((product, index) => ({
                            column: "columnTwo",
                            section: "sectionOne",
                            sectionType: "Products",
                            type: "Products",
                            id: product._id,
                            order: currentDNoResultOrder.length + index + 1, // Incremental order
                          }));

                        // Add all siteProducts of type "Products" to searchResultContentOrdering in the second tab
                        const productsToAdd3 = siteData.siteProducts
                          .map((product, index) => ({
                            tabName: "Products",
                            tabNumber: "two",
                            type: "Products",
                            id: product._id,
                            order: currentTabOrder.length + index + 1, // Incremental order
                          }));

                        // Update the values in the form fields
                        setValue(
                          "instantSearchWidgetCustomization.searchResultContentOrdering",
                          [...currentOrder, ...productsToAdd],
                          { shouldDirty: true }
                        );
                        setValue(
                          "instantSearchWidgetCustomization.defaultOrNoResultOrdering",
                          [...currentDefaultOrNoResultOrder, ...productsToAdd1],
                          { shouldDirty: true }
                        );
                        setValue(
                          "searchResultPageCustomization.noResultOrdering",
                          [...currentDNoResultOrder, ...productsToAdd2],
                          { shouldDirty: true }
                        );
                        setValue(
                          "searchResultPageCustomization.searchResultContentOrdering",
                          [...currentTabOrder, ...productsToAdd3],
                          { shouldDirty: true }
                        );
                      } else {
                        // Remove all siteProducts with type "Products" from searchResultContentOrdering
                        const updatedOrder = currentOrder.filter(
                          (entry) => entry.type !== "Products"
                        );

                        // Remove all siteProducts from defaultOrNoResultOrdering
                        const updatedDefaultOrNoResultOrder = currentDefaultOrNoResultOrder.filter(
                          (entry) => entry.type !== "Products"
                        );

                        // Remove all siteProducts from noResultOrdering
                        const updatedNoResultOrder = currentDNoResultOrder.filter(
                          (entry) => entry.type !== "Products"
                        );

                        // Remove all siteProducts from searchResultContentOrdering for tabTwo
                        const updatedTabOrder = currentTabOrder.filter(
                          (entry) => entry.type !== "Products"
                        );

                        // Update the values in the form fields
                        setValue(
                          "instantSearchWidgetCustomization.searchResultContentOrdering",
                          updatedOrder,
                          { shouldDirty: true }
                        );
                        setValue(
                          "instantSearchWidgetCustomization.defaultOrNoResultOrdering",
                          updatedDefaultOrNoResultOrder,
                          { shouldDirty: true }
                        );
                        setValue(
                          "searchResultPageCustomization.noResultOrdering",
                          updatedNoResultOrder,
                          { shouldDirty: true }
                        );
                        setValue(
                          "searchResultPageCustomization.searchResultContentOrdering",
                          updatedTabOrder,
                          { shouldDirty: true }
                        );
                      }
                    }}
                  />
                  <label htmlFor="allProducts">All products</label>
                </div>
              </div>
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

          <div>
            <h3 className="text-md font-medium mb-2">
              Add this snippet into the &lt;head&gt; section.
            </h3>
            <div className="relative">
              <textarea
                ref={textAreaRef} // Set reference for textarea
                className="w-full border min-h-[130px] h-[180px] outline-none border-black rounded-lg p-2 text-sm resize-none z-20"
                rows={2}
                placeholder="Enter your code snippet here..."
                value={codeSnippet}
                readOnly
              ></textarea>
              <button
                onClick={handleCopy}
                className="absolute top-1 right-1 px-2 py-1 bg-gray-500 text-white rounded-md"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSettingsGernal;