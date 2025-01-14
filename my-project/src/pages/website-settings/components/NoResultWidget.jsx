import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useFormContext, useWatch } from "react-hook-form";

const ITEM_TYPE = "ITEM";

const NoResultsLayoutSettings = () => {
  const { getValues, setValue, control } = useFormContext();
  const ordering = useWatch({
    control,
    name: "instantSearchWidgetCustomization.defaultOrNoResultOrdering",
  }); // Watch for changes in "ordering"
  const defaultOrNoResultLayout = useWatch({
    control,
    name: "instantSearchWidgetCustomization.defaultOrNoResultLayout",
  }); // Watch for changes in "defaultOrNoResultLayout"

  const handleLayoutChange = (layout) => {
    setValue("instantSearchWidgetCustomization.defaultOrNoResultLayout", layout, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const moveItem = (source, destination) => {
    const { sourceColumn, sourceSection, sourceId } = source;
    const { destColumn, destSection, destIndex } = destination;

    // Clone current ordering
    const updatedOrdering = [
      ...getValues("instantSearchWidgetCustomization.defaultOrNoResultOrdering"),
    ];

    // Find and remove the source item
    const itemIndex = updatedOrdering.findIndex(
      (item) =>
        item.column === sourceColumn &&
        item.section === sourceSection &&
        item.id === sourceId
    );
    const [movedItem] = updatedOrdering.splice(itemIndex, 1);

    // Update the moved item's column and section
    movedItem.column = destColumn;
    movedItem.section = destSection;

    // Insert the item at the destination index
    updatedOrdering.splice(destIndex, 0, movedItem);

    // Reorder items
    const reorder = (items) =>
      items.map((item, index) => ({ ...item, order: index + 1 }));
    const grouped = updatedOrdering.reduce((acc, item) => {
      const key = `${item.column}-${item.section}`;
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    }, {});
    const reordered = Object.values(grouped).flatMap(reorder);

    // Update form state
    setValue(
      "instantSearchWidgetCustomization.defaultOrNoResultOrdering",
      reordered,
      { shouldValidate: true, shouldDirty: true }
    );
  };

  const getItems = (column, section) =>
    ordering
      ? ordering
        .filter((item) => item.column === column && item.section === section)
        .sort((a, b) => a.order - b.order)
      : [];

  return (
    <div className="w-full space-y-6">
      {/* Layout Configuration */}
      <div className="rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Default/No Results Layout</h2>
        <div className="space-y-2 text-sm">
          <div>
            <input
              type="checkbox"
              id="twoColumn"
              checked={defaultOrNoResultLayout === "two-column"}
              onChange={() => handleLayoutChange("two-column")}
              className="mr-2 accent-black"
            />
            <label htmlFor="twoColumn">Two-column</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="oneColumn"
              checked={defaultOrNoResultLayout === "one-column"}
              onChange={() => handleLayoutChange("one-column")}
              className="mr-2 accent-black"
            />
            <label htmlFor="oneColumn">One-column</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="searchTerms"
              checked={defaultOrNoResultLayout === "suggested-search-terms"}
              onChange={() => handleLayoutChange("suggested-search-terms")}
              className="mr-2 accent-black"
            />
            <label htmlFor="Suggested search terms">Suggested search terms</label>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">Default/No Results Ordering</h2>
        <div>
          <div>
            <input
              type="checkbox"
              id="searchTerms"
              checked={defaultOrNoResultLayout === "suggested-search-terms"}
              onChange={() => handleLayoutChange("suggested-search-terms")}
              className="mr-2 accent-black"
            />
            <label htmlFor="Suggested search terms">  Use the most popular searches for search terms
            </label>
          </div>
        </div>
      </div>

      {/* Columns Preview */}
      <div className="flex gap-4 mt-5 mx-auto border-black rounded-lg">
        {["columnOne", "columnTwo"].map((columnName) => (
          <div key={columnName} className="flex flex-col w-full">
            <h2 className="font-semibold px-2 py-2">{formatName(columnName)}</h2>
            <div className="flex-1 border rounded-lg border-black">
              {["suggestedTerms", "sectionOne"].map((sectionName) => {
                // Conditionally render sections based on the column
                if (
                  (columnName === "columnOne" && sectionName === "suggestedTerms") ||
                  (columnName === "columnTwo" && sectionName === "invalidSection") // Additional check to avoid future issues
                ) {
                  return null; // Skip the rendering
                }

                return (
                  <Section
                    key={`${columnName}-${sectionName}`}
                    columnName={columnName}
                    sectionName={sectionName}
                    items={getItems(columnName, sectionName)}
                    moveItem={moveItem}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Section = ({ columnName, sectionName, items, moveItem }) => {
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
    <div
      ref={(node) => {
        ref.current = node;
        drop(node);
      }}
      className="p-2"
    >
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
        />
      ))}
    </div>
  );
};

const DraggableItem = ({ item, source }) => {
  const [, drag] = useDrag({
    type: ITEM_TYPE,
    item: { source },
  });

  return (
    <div
      ref={drag}
      className="flex py-1 items-center gap-1 text-sm cursor-move px-2"
    >
      <svg
        width="14"
        height="11"
        viewBox="0 0 11 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5Z"
          fill="black"
        />
        <path
          d="M4 1.5C4 0.671573 4.67157 0 5.5 0C6.32843 0 7 0.671573 7 1.5C7 2.32843 6.32843 3 5.5 3C4.67157 3 4 2.32843 4 1.5Z"
          fill="black"
        />
        <path
          d="M8 1.5C8 0.671573 8.67157 0 9.5 0C10.3284 0 11 0.671573 11 1.5C11 2.32843 10.3284 3 9.5 3C8.67157 3 8 2.32843 8 1.5Z"
          fill="black"
        />
        <path
          d="M8 5.5C8 4.67157 8.67157 4 9.5 4C10.3284 4 11 4.67157 11 5.5C11 6.32843 10.3284 7 9.5 7C8.67157 7 8 6.32843 8 5.5Z"
          fill="black"
        />
        <path
          d="M4 5.5C4 4.67157 4.67157 4 5.5 4C6.32843 4 7 4.67157 7 5.5C7 6.32843 6.32843 7 5.5 7C4.67157 7 4 6.32843 4 5.5Z"
          fill="black"
        />
        <path
          d="M0 5.5C0 4.67157 0.671573 4 1.5 4C2.32843 4 3 4.67157 3 5.5C3 6.32843 2.32843 7 1.5 7C0.671573 7 0 6.32843 0 5.5Z"
          fill="black"
        />
      </svg>
      <p className="pb-1"> {item.id}</p>

    </div>
  );
};

const formatName = (name) =>
  name
    .replace(/([A-Z])/g, " $1")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();

export default NoResultsLayoutSettings;
