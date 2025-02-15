import React, { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
// import { collections } from "../../../../demo";

const WebsiteSettingsGeneral = ({ siteData, siteId }) => {
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

  const codeSnippet = `<script defer src="https://dash.searchflow.app/widget.js" data-user-id="${userId}" data-site-id="${siteId}"></script>`;

  return (
    <div className="flex flex-col md:flex-row gap-4 mx-2 mb-4">
      {/* Left Section */}
      <div className="flex-1 bg-white border border-secondary rounded p-6">
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
                    id={item.webflowCollectionId}
                    className="mr-2 accent-black"
                    {...register("searchFrom.collections")}
                    value={item.webflowCollectionId}
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
      <div className="flex-1 bg-white rounded p-6 border border-secondary">
        <h2 className="text-lg font-semibold mb-4">Setup instructions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-md font-medium mb-2">
              1. Add the snippet below to the &lt;head&gt; section in Webflow.
            </h3>
            <div className="relative">
              <textarea
                ref={textAreaRef} // Set reference for textarea
                className="w-full border min-h-[100px] h-[100px] outline-none border-secondary rounded p-2 text-sm resize-none z-20"
                rows={2}
                placeholder="Loading..."
                value={codeSnippet}
                readOnly
              ></textarea>
              <button
                onClick={handleCopy}
                className="absolute top-1 right-1 px-2 py-1 bg-gray-600 text-white rounded"
              >
                Copy
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-md font-medium mb-2">
              2. Add the snippet below to the element on your website you want to open the search widget.
            </h3>
            <div className="relative">
              <textarea
                ref={textAreaRef} // Set reference for textarea
                className="w-full border outline-none border-secondary rounded p-2 text-sm resize-none z-20"
                rows={2}
                placeholder="Loading..."
                value="searchflow-open"
                readOnly
              ></textarea>
              <button
                onClick={handleCopy}
                className="absolute top-1 right-1 px-2 py-1 bg-gray-600 text-white rounded"
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

export default WebsiteSettingsGeneral;