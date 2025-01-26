import React, { useRef } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFormContext, useWatch } from "react-hook-form";
import NoResultsLayoutSettings from "./NoResultWidget";

const ITEM_TYPE = "ITEM";

const layoutOptions = [
  { id: "one-tab", label: "One tab" },
  { id: "two-tabs", label: "Two tabs" },
  { id: "three-tabs", label: "Three tabs" },
];
const SearchPageConf = ({ siteData }) => {
  const { getValues, setValue, register, control } = useFormContext();
  const ordering = useWatch({ control, name: "searchResultPageCustomization.noResultOrdering" }); // Watch for changes in "ordering"

  const searchResultContentOrdering = useWatch({ control, name: "searchResultPageCustomization.searchResultContentOrdering" }); // Watch for changes in "ordering"
  const { siteCollections, siteProducts, sitePages, userSuggestedTerms } = siteData;
  const dataSources = {
    siteCollections,
    siteProducts,
    sitePages,
    userSuggestedTerms,
  };
  const searchResultLayout = useWatch({
    control,
    name: "searchResultPageCustomization.searchResultLayout",
  }); // Watch for changes in "searchResultLayout"

  const handleLayoutChange = (layout) => {
    setValue(
      "searchResultPageCustomization.searchResultLayout",
      layout,
      { shouldValidate: true, shouldDirty: true }
    );
  };

  const moveItem = (source, destination) => {
    const { sourceColumn, sourceSection, sourceId } = source;
    const { destColumn, destSection, destIndex } = destination;

    // Clone the current ordering
    const updatedOrdering = [...getValues("searchResultPageCustomization.noResultOrdering")];

    // Find and remove the source item
    const itemIndex = updatedOrdering.findIndex(
      (item) =>
        item.column === sourceColumn &&
        item.section === sourceSection &&
        item.id === sourceId
    );
    if (itemIndex === -1) {
      console.error("Item not found in the source column/section.");
      return;
    }
    const [movedItem] = updatedOrdering.splice(itemIndex, 1);

    // Update the moved item's column and section
    // movedItem.column = destColumn;
    // movedItem.section = destSection;

    // Get the items in the destination group and insert the moved item at the correct index
    const destinationGroup = updatedOrdering.filter(
      (item) => item.column === destColumn && item.section === destSection
    );

    const reorderedDestinationGroup = [
      ...destinationGroup.slice(0, destIndex),
      movedItem,
      ...destinationGroup.slice(destIndex),
    ].map((item, index) => ({
      ...item,
      order: index + 1, // Update order only for the destination group
    }));

    // Update the rest of the ordering without modifying other groups
    const finalOrdering = updatedOrdering
      .filter(
        (item) => !(item.column === destColumn && item.section === destSection)
      )
      .concat(reorderedDestinationGroup);

    // console.log("finalOrdering", finalOrdering);

    // Update the form state
    setValue(
      "searchResultPageCustomization.noResultOrdering",
      finalOrdering,
      { shouldValidate: true, shouldDirty: true }
    );
  };

  const getItems = (column, section) =>
    ordering
      ? ordering.filter((item) => item.column === column && item.section === section)
        .sort((a, b) => a.order - b.order) : [];

  function getDisplayName(item, dataSources) {
    const { type, id } = item; // Extract type and id from the item

    // Map the type to the appropriate dataset
    const typeToDatasetMap = {
      Collections: dataSources.siteCollections,
      Products: dataSources.siteProducts,
      Pages: dataSources.sitePages,
      suggestedTerms: dataSources.userSuggestedTerms,
    };

    // Get the dataset corresponding to the type
    const dataset = typeToDatasetMap[type];

    if (!dataset) {
      return null; // Return null if type is not recognized
    }

    // Find the object in the dataset by id
    const matchedItem = dataset.find((dataItem) => dataItem._id === id);

    if (!matchedItem) {
      return null; // Return null if no matching item is found
    }
    // Return the displayName based on the type
    if (type === "Collections") {
      return matchedItem.displayName || null; // Fallback to null if displayName doesn't exist
    } else if (type === "Products") {
      return matchedItem.fieldData?.name || null; // Fallback to null if fieldData.displayName doesn't exist
    } else if (type === "Pages") {
      return matchedItem.title || null;

      // Fallback to null if title doesn't exist
    } else if (type === "suggestedTerms") {
      return matchedItem.term || null; // Fallback to null if term doesn't exist
    }
    return null; // Default fallback in case no conditions match
  }

  const moveTabItem = (source, destination) => {
    const { sourceSection, sourceColumn, sourceId } = source;
    const { destSection, destColumn, destIndex } = destination;


    // Clone current ordering
    const updatedOrdering = [...getValues("searchResultPageCustomization.searchResultContentOrdering")];

    // Find and remove the source item
    const itemIndex = updatedOrdering.findIndex(
      (item) =>
        item.tabNumber === sourceSection &&
        item.tabName === sourceColumn &&
        item.id === sourceId
    );

    if (itemIndex === -1) {
      console.error("Source item not found");
      return;
    }

    const [movedItem] = updatedOrdering.splice(itemIndex, 1);

    // Identify the destination group (tab + column)
    const destinationGroup = updatedOrdering.filter(
      (item) => item.tabNumber === destSection && item.tabName === destColumn
    );

    // Insert the moved item into the destination group
    if (sourceSection === destSection && sourceColumn === destColumn) {
      // Moving within the same group
      const groupStartIndex = updatedOrdering.findIndex(
        (item) => item.tabNumber === destSection && item.tabName === destColumn
      );
      updatedOrdering.splice(groupStartIndex + destIndex, 0, movedItem);
    } else {
      // Moving to a different group
      const groupStartIndex = updatedOrdering.findIndex(
        (item) => item.tabNumber === destSection && item.tabName === destColumn
      );

      if (groupStartIndex === -1) {
        // If the group doesn't exist, add the item to the end
        updatedOrdering.push(movedItem);
      } else {
        updatedOrdering.splice(groupStartIndex + destIndex, 0, movedItem);
      }
    }

    // Reorder only the destination group
    const destinationGroupItems = updatedOrdering.filter(
      (item) => item.tabNumber === destSection && item.tabName === destColumn
    );

    destinationGroupItems.forEach((item, index) => {
      item.order = index + 1; // Update the order within the destination group
    });

    // Update form state
    setValue("searchResultPageCustomization.searchResultContentOrdering", updatedOrdering, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };




  const getTabItems = (tab, column) => {
    if (!searchResultContentOrdering || !Array.isArray(searchResultContentOrdering)) {
      return [];
    }

    return searchResultContentOrdering
      .filter((item) =>
        String(item.tabName).toLowerCase() === String(tab).toLowerCase() &&
        String(item.tabNumber).toLowerCase() === String(column).toLowerCase()
      )
      .sort((a, b) => a.order - b.order);
  };


  return (
    <div className="flex flex-col gap-2 p-6 md:gap-10 lg:flex-row border border-black justify-between rounded-xl m-2">
      {/* left section */}
      <div className="w-full">
        <h2 className="text-lg font-bold mb-4">Search results page</h2>
        <div className="mx-2">
          <h3 className="text-base font-semibold mb-2">Search results layout</h3>
          {/* check Box section  */}
          <div className="space-y-1">
            {layoutOptions.map(({ id, label }) => (
              <div key={id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={id}
                  checked={searchResultLayout === id || false}  // Ensure it's always boolean
                  onChange={() => handleLayoutChange(id)}
                  className="cursor-pointer accent-black"
                />

                <label htmlFor={id} className="text-sm cursor-pointer">
                  {label}
                </label>
              </div>
            ))}
          </div>

        </div>
        <div className="space-y-6 mx-2 mt-2">
          <div>
            <h3 className="text-md font-medium mb-2">Search results content ordering</h3>
            <div className="flex flex-col mt-5 w-full mx-auto border-black rounded-xl">
              {/* Tabs Section */}
              <div className="flex flex-col md:flex-row gap-1 md:gap-0 text-center  justify-between border-gray-300">
                {["tabOne", "tabTwo", "tabThree"].map((tabNo) => (
                  <div
                    key={tabNo}
                    className="px-2 mx-4 text-sm font-semibold py-1 cursor-pointer  font-semibold"
                  >
                    {formatName(tabNo)}
                  </div>
                ))}
              </div>

              {/* Main Content Section */}
              <div className="flex flex-wrap md:flex-nowrap w-full border rounded-xl border-black">
                {/* if we have to drag and drop full system then 
                {["columnOne", "columnTwo", "columnThree"].map((columnName, index) => { */}
                {/* else for ordering change */}
                {["Collections", "Products", "Pages"].map((columnName, index) => {
                  // Map columns to sections
                  const sectionName = ["one", "two", "three"][index];

                  return (
                    <div
                      key={columnName}
                      className={`flex  flex-col w-full ${index !== 2 ? "md:border-r border-black" : ""}`}
                    >
                      <h2 className="font-semibold px-2 py-2">{formatName(columnName)}</h2>
                      <div className="flex-1 border-t border-black">
                        <Section
                          key={`${columnName}-${sectionName}`}
                          columnName={columnName}
                          sectionName={sectionName}
                          items={getTabItems(columnName, sectionName)} // Get items specific to tab and column
                          moveItem={moveTabItem}
                          getDisplayName={getDisplayName}
                          dataSources={dataSources} // Use the moveTabItem function
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right section */}
      <div className="md:mt-6 flex flex-col gap-2 mx-2 md:ml-0 w-full">
        <div className="mb-3 flex flex-col gap-3">
          <h3 className="text- font-semibold mb-1">No results content ordering</h3>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="suggestedSearchTerms"
              className="accent-black"
              // checked={useWatch({ control, name: "searchResultPageCustomization.suggestedSearchTerms" }) || false} 
              {...register("searchResultPageCustomization.suggestedSearchTerms")}
              // Ensure it's boolean
              onChange={(e) => {
                const isChecked = e.target.checked;
                const currentNoResultOrdering = getValues("searchResultPageCustomization.noResultOrdering");

                if (isChecked) {
                  // Add all userSuggestedTerms to `noResultOrdering`
                  const suggestedTermsToAdd = siteData.userSuggestedTerms.map((term, index) => ({
                    column: "columnOne",
                    section: "SuggestedTerms",
                    sectionType: "suggestedTerms",
                    type: "suggestedTerms",
                    id: term._id,
                    order: index + 1, // Incremental order starting from 1
                  }));

                  // Update the value for `noResultOrdering` in `searchResultPageCustomization`
                  setValue(
                    "searchResultPageCustomization.noResultOrdering",
                    [...currentNoResultOrdering, ...suggestedTermsToAdd],
                    { shouldDirty: true }
                  );
                } else {
                  // Remove all suggestedTerms from `noResultOrdering`
                  const updatedNoResultOrdering = currentNoResultOrdering.filter(
                    (entry) => entry.type !== "suggestedTerms"
                  );

                  // Update the value for `noResultOrdering` in `searchResultPageCustomization`
                  setValue(
                    "searchResultPageCustomization.noResultOrdering",
                    updatedNoResultOrdering,
                    { shouldDirty: true }
                  );
                }
              }}
            />
            <label htmlFor="suggestedSearchTerms" className="text-sm">
              Suggested search terms
            </label>
          </div>


          <h3 className="text- font-semibold mb-1">Search results content ordering</h3>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-black"
              id="popularSearchTerms"
              checked={useWatch({ control, name: "searchResultPageCustomization.popularSearchTerms" }) || false}  // Ensure it's boolean
              onChange={(e) =>
                setValue(
                  "searchResultPageCustomization.popularSearchTerms",
                  e.target.checked,
                  { shouldValidate: true, shouldDirty: true }
                )
              }
            />
            <label htmlFor="popularSearchTerms" className="text-sm">
              Use the most popular searches for search terms
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-5  w-full gap-4 mx-auto border-black rounded-xl">
          {["columnOne", "columnTwo"].map((columnName) => (
            <div key={columnName} className="flex flex-col w-full">
              <h2 className="font-semibold hidden px-2 py-2">{formatName(columnName)}</h2>
              <div className="flex-1 border rounded-xl border-black">
                {["SuggestedTerms", "sectionOne", "sectionTwo"]
                  .filter((sectionName) => {
                    // Show only "SuggestedTerms" in columnOne
                    if (columnName === "columnOne") {
                      return sectionName === "SuggestedTerms";
                    }
                    // Show "sectionOne" and "sectionTwo" in columnTwo
                    if (columnName === "columnTwo") {
                      return sectionName === "sectionOne" || sectionName === "sectionTwo";
                    }
                    return false;
                  })
                  .map((sectionName) => (
                    <Section
                      key={`${columnName}-${sectionName}`}
                      columnName={columnName}
                      sectionName={sectionName}
                      items={getItems(columnName, sectionName)}
                      moveItem={moveItem}
                      getDisplayName={getDisplayName}
                      dataSources={dataSources}
                    />
                  ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};
const Section = ({ columnName, sectionName, items, moveItem, getDisplayName, dataSources }) => {

  const ref = useRef();
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const boundingRect = ref.current.getBoundingClientRect();
      const y = offset.y - boundingRect.top;

      const destination = {
        destColumn: columnName,
        destSection: sectionName,
        destIndex: Math.min(Math.max(0, Math.floor(y / 50)), items.length),
      };

      moveItem(item.source, destination);
    },
  });

  return (
    <div ref={(node) => { ref.current = node; drop(node); }} className="p-2">
      <h3 className="font-semibold text-base px-2 mb-2">{formatName(sectionName)}</h3>
      {items.map((item, index) => (
        <DraggableItem
          key={item.id}
          item={item}
          index={index}
          source={{
            sourceColumn: columnName,
            sourceSection: sectionName,
            sourceId: item.id,
          }}
          getDisplayName={getDisplayName}
          dataSources={dataSources}
        />
      ))}
    </div>
  );
};

const DraggableItem = ({ item, source, getDisplayName, dataSources }) => {

  const [, drag] = useDrag({
    type: ITEM_TYPE,
    item: { source },
  });

  const displayName = getDisplayName(item, dataSources);

  return (

    <div
      ref={drag}
      className="flex py-1 items-center gap-1 text-sm cursor-move px-2 "
    >
      <svg
        width="14"
        height="11"
        viewBox="0 0 11 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5Z" fill="black" />
        <path d="M4 1.5C4 0.671573 4.67157 0 5.5 0C6.32843 0 7 0.671573 7 1.5C7 2.32843 6.32843 3 5.5 3C4.67157 3 4 2.32843 4 1.5Z" fill="black" />
        <path d="M8 1.5C8 0.671573 8.67157 0 9.5 0C10.3284 0 11 0.671573 11 1.5C11 2.32843 10.3284 3 9.5 3C8.67157 3 8 2.32843 8 1.5Z" fill="black" />
        <path d="M8 5.5C8 4.67157 8.67157 4 9.5 4C10.3284 4 11 4.67157 11 5.5C11 6.32843 10.3284 7 9.5 7C8.67157 7 8 6.32843 8 5.5Z" fill="black" />
        <path d="M4 5.5C4 4.67157 4.67157 4 5.5 4C6.32843 4 7 4.67157 7 5.5C7 6.32843 6.32843 7 5.5 7C4.67157 7 4 6.32843 4 5.5Z" fill="black" />
        <path d="M0 5.5C0 4.67157 0.671573 4 1.5 4C2.32843 4 3 4.67157 3 5.5C3 6.32843 2.32843 7 1.5 7C0.671573 7 0 6.32843 0 5.5Z" fill="black" />
      </svg>
      <p className="pb-1"> {displayName}</p>
    </div>
  );
};

const formatName = (name) =>
  name
    .replace(/([A-Z])/g, " $1")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();

export default SearchPageConf;
