import React, { useState, useEffect } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFormContext } from "react-hook-form";
import NoResultsLayoutSettings from "./NoResultWidget";

const ITEM_TYPE = "COLLECTION";

// Reusable Checkbox Component
const Checkbox = ({ id, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={id}
      className="mr-2 text-sm accent-black"
      checked={checked}
      onChange={onChange}
    />
    <label className="text-sm" htmlFor={id}>
      {label}
    </label>
  </div>
);

// Draggable Item Component
const DraggableItem = ({ item, index, moveItem, columnId }) => {
  const [, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: item.id, index, columnId },
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (draggedItem) => {
      if (
        draggedItem.columnId === columnId &&
        draggedItem.index !== index
      ) {
        moveItem(draggedItem.index, index, columnId);
        draggedItem.index = index; // Ensure subsequent hover works correctly
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="flex items-center gap-1 text-sm cursor-move mt-1"
    >
      <svg
        width="13"
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
      {item.type === "collection" ? `${item.id}` : `${item.id}`}
    </div>
  );
};

// Column Component with Sections
const Column = ({ title, columnId, items, moveItem, moveBetweenColumns }) => {
  const sections = items.reduce((acc, item) => {
    acc[item.section] = acc[item.section] || [];
    acc[item.section].push(item);
    return acc;
  }, {});

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (draggedItem) => {
      if (draggedItem.columnId !== columnId) {
        moveBetweenColumns(
          draggedItem.id,
          columnId,
          draggedItem.sectionName,
          "new-section" // Default to a specific or new section if needed
        );
      }
    },
  });

  return (
    <div
      ref={drop}
      className="flex-1 border border-black rounded-lg p-4 bg-gray-50"
    >
      <h4 className="text-sm font-semibold mb-2">{title}</h4>
      {Object.entries(sections).map(([sectionName, sectionItems]) => (
        <div key={sectionName} className="mb-4">
          <h5 className="text-xs font-semibold mb-2">{sectionName}</h5>
          {sectionItems.map((item, index) => (
            <DraggableItem
              key={item.id}
              item={item}
              index={index}
              columnId={columnId}
              sectionName={sectionName}
              moveItem={moveItem}
            />
          ))}
        </div>
      ))}
    </div>
  );
};



// Main Component
const SearchWidgetConf = () => {
  const { getValues, setValue } = useFormContext();
  const initialData = getValues("instantSearchWidgetCustomization");
  const [layout, setLayout] = useState(initialData.searchResultLayout || "one-column");
  const [columnAssignments, setColumnAssignments] = useState(() => {
    const groupedByColumn = initialData.searchResultContentOrdering.reduce(
      (acc, item) => {
        const columnId = item.column === "columnOne" ? "column-one" : "column-two";
        acc[columnId] = acc[columnId] || [];
        acc[columnId].push(item);
        return acc;
      },
      { "column-one": [], "column-two": [] }
    );
    return groupedByColumn;
  });


  // Update form data on changes
  useEffect(() => {
    setValue("instantSearchWidgetCustomization.searchResultContentOrdering", [
      ...columnAssignments["column-one"].map((item, order) => ({
        ...item,
        column: "columnOne",
        order: order + 1,
      })),
      ...columnAssignments["column-two"].map((item, order) => ({
        ...item,
        column: "columnTwo",
        order: order + 1,
      })),
    ]);
    setValue("instantSearchWidgetCustomization.searchResultLayout", layout);
  }, [columnAssignments, layout, setValue]);

  const handleLayoutChange = (selectedLayout) => {
    setLayout(selectedLayout);
    if (selectedLayout === "one-column") {
      setColumnAssignments((prev) => ({
        "column-one": [...prev["column-one"], ...prev["column-two"]],
        "column-two": [],
      }));
    }
  };

  const moveItem = (fromIndex, toIndex, columnId) => {
    setColumnAssignments((prev) => {
      const columnItems = [...prev[columnId]];
      const [movedItem] = columnItems.splice(fromIndex, 1);
      columnItems.splice(toIndex, 0, movedItem);
      return { ...prev, [columnId]: columnItems };
    });
  };

  const moveBetweenColumns = (itemId, targetColumnId) => {
    setColumnAssignments((prev) => {
      const sourceColumnId = Object.keys(prev).find((colId) =>
        prev[colId].some((item) => item.id === itemId)
      );
      if (!sourceColumnId || sourceColumnId === targetColumnId) return prev;

      const sourceItems = [...prev[sourceColumnId]];
      const targetItems = [...prev[targetColumnId]];
      const itemIndex = sourceItems.findIndex((item) => item.id === itemId);

      const [movedItem] = sourceItems.splice(itemIndex, 1);
      targetItems.push(movedItem);

      return {
        ...prev,
        [sourceColumnId]: sourceItems,
        [targetColumnId]: targetItems,
      };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col md:flex-row gap-6 border border-black rounded-lg p-6 mx-2">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Instant Search Widget</h2>
          <div className="space-y-6">
            <div className="">
              <h3 className="text-md font-medium mb-2">Search Results Layout</h3>
              <div className="flex flex-col gap-2">
                <Checkbox
                  id="oneColumn"
                  label="One-column"
                  checked={layout === "one-column"}
                  onChange={() => handleLayoutChange("one-column")}
                />
                <Checkbox
                  id="twoColumn"
                  label="Two-column"
                  checked={layout === "two-column"}
                  onChange={() => handleLayoutChange("two-column")}
                />
              </div>
            </div>
            <div className="flex gap-6">
              <Column
                title="Column One"
                columnId="column-one"
                items={columnAssignments["column-one"]}
                moveItem={moveItem}
                moveBetweenColumns={moveBetweenColumns}
              />
              {layout === "two-column" && (
                <Column
                  title="Column Two"
                  columnId="column-two"
                  items={columnAssignments["column-two"]}
                  moveItem={moveItem}
                  moveBetweenColumns={moveBetweenColumns}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <NoResultsLayoutSettings />
        </div>
      </div>
    </DndProvider>
  );
};

export default SearchWidgetConf;
