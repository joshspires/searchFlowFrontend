import React, { useState } from "react";
import { collections } from "../../../../demo";
import NoResultsLayoutSettings from "./NoResultWidget";

const SearchWidgetConf = () => {
  const [layout, setLayout] = useState("one-column"); // Default to one column
  const [columnAssignments, setColumnAssignments] = useState({}); // Tracks which column each collection belongs to

  const handleLayoutChange = (selectedLayout) => {
    setLayout(selectedLayout);
    if (selectedLayout === "one-column") {
      // Reset all assignments to column 1 if one-column is selected
      setColumnAssignments((prev) =>
        Object.fromEntries(Object.keys(prev).map((key) => [key, "column-one"]))
      );
    }
  };

  const handleColumnAssignment = (collectionId, column) => {
    setColumnAssignments((prev) => ({
      ...prev,
      [collectionId]: column,
    }));
  };

  return (
    <div className="flex flex-wrap gap-6 p-3">
      {/* Configuration Section */}
      <div class="flex bg-white rounded-lg shadow-lg p-6 flex-1">
        <div className="flex-1 ">
          <h2 className="text-lg font-semibold mb-4">Instant search widget</h2>
          <div className="space-y-6">
            {/* Search Results Layout */}
            <div>
              <h3 className="text-md font-medium mb-2">
                Search results layout
              </h3>
              <div className="space-y-2">
                <div>
                  <input
                    type="radio"
                    _id="twoColumn"
                    name="layout"
                    className="mr-2"
                    checked={layout === "two-column"}
                    onChange={() => handleLayoutChange("two-column")}
                  />
                  <label htmlFor="twoColumn">Two-column</label>
                </div>
                <div>
                  <input
                    type="radio"
                    _id="oneColumn"
                    name="layout"
                    className="mr-2"
                    checked={layout === "one-column"}
                    onChange={() => handleLayoutChange("one-column")}
                  />
                  <label htmlFor="oneColumn">One-column</label>
                </div>
              </div>
            </div>

            {/* Collections Assignment Section */}
            <div className=" bg-white">
              <h2 className="text-lg font-semibold mb-4">Assign collections</h2>
              <div className="space-y-4">
                {collections?.map((collection) => (
                  <div key={collection._id} className="">
                    <p>{collection.displayName}</p>
                    <div className="flex gap-4 mt-2">
                      <div>
                        <input
                          type="radio"
                          _id={`${collection._id}-column-one`}
                          name={`collection-${collection._id}`}
                          className="mr-2"
                          checked={
                            columnAssignments[collection._id] === "column-one"
                          }
                          onChange={() =>
                            handleColumnAssignment(collection._id, "column-one")
                          }
                        />
                        <label htmlFor={`${collection._id}-column-one`}>
                          Column one
                        </label>
                      </div>
                      {layout === "two-column" && (
                        <div>
                          <input
                            type="radio"
                            _id={`${collection._id}-column-two`}
                            name={`collection-${collection._id}`}
                            className="mr-2"
                            checked={
                              columnAssignments[collection._id] === "column-two"
                            }
                            onChange={() =>
                              handleColumnAssignment(
                                collection._id,
                                "column-two"
                              )
                            }
                          />
                          <label htmlFor={`${collection._id}-column-two`}>
                            Column two
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Results Content Ordering */}
            <div>
              <h3 className="text-md font-medium mb-2">
                Search results content ordering
              </h3>
              <div className={`flex ${layout === "one-column" ? "" : "gap-6"}`}>
                {/* Column One */}
                <div className="">
                  <h4 className="text-sm font-semibold mb-2">Column one</h4>
                  <div className="border rounded-lg p-4 space-y-2">
                    {Object.entries(columnAssignments)
                      .filter(([_, column]) => column === "column-one")
                      .map(([_id]) => (
                        <p key={_id}>
                          •••{" "}
                          {collections.find((c) => c._id === _id)?.displayName}
                        </p>
                      ))}
                  </div>
                </div>

                {/* Column Two (Conditional) */}
                {layout === "two-column" && (
                  <div className="">
                    <h4 className="text-sm font-semibold mb-2">Column two</h4>
                    <div className="border rounded-lg p-4 space-y-2">
                      {Object.entries(columnAssignments)
                        .filter(([_, column]) => column === "column-two")
                        .map(([_id]) => (
                          <p key={_id}>
                            •••{" "}
                            {
                              collections.find((c) => c._id === _id)
                                ?.displayName
                            }
                          </p>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* <NoResultsLayoutSettings /> */}
          </div>
        </div>

        <div>
          <NoResultsLayoutSettings />
        </div>
      </div>
    </div>
  );
};

export default SearchWidgetConf;
