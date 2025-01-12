import React, { useState, useRef } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ITEM_TYPE = "ITEM";

const NoResultsLayoutSettings = () => {

  const [layout, setLayout] = useState("two-column");
  const [showPopularSearches, setShowPopularSearches] = useState(false);
  const [columns, setColumns] = useState({
    columnOne: ["Product 1", "Product 2", "Product 3"],
    columnTwo: ["Suggested Term 1", "Suggested Term 2", "Suggested Term 3"],
  });

  const moveItem = (source, destination) => {
    const { sourceColumn, sourceIndex } = source;
    const { destColumn, destIndex } = destination;

    if (sourceColumn === destColumn && sourceIndex === destIndex) return;

    const updatedColumns = { ...columns };
    const sourceItems = [...updatedColumns[sourceColumn]];
    const [movedItem] = sourceItems.splice(sourceIndex, 1);

    if (sourceColumn === destColumn) {
      sourceItems.splice(destIndex, 0, movedItem);
      updatedColumns[sourceColumn] = sourceItems;
    } else {
      const destItems = [...updatedColumns[destColumn]];
      destItems.splice(destIndex, 0, movedItem);
      updatedColumns[sourceColumn] = sourceItems;
      updatedColumns[destColumn] = destItems;
    }

    setColumns(updatedColumns);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full space-y-6">
        {/* Layout Configuration */}
        <div className="rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Default/No Results Layout</h2>
          <div className="space-y-1 text-sm">
            <Checkbox
              id="twoColumn"
              label="Two-column"
              checked={layout === "two-column"}
              onChange={() => setLayout("two-column")}
            />
            <Checkbox
              id="oneColumn"
              label="One-column"
              checked={layout === "one-column"}
              onChange={() => setLayout("one-column")}
            />
            <div>
              <input
                type="checkbox"
                id="suggestedTerms"
                className="mr-2 accent-black"
                checked={showPopularSearches}
                onChange={() => setShowPopularSearches(!showPopularSearches)}
              />
              <label htmlFor="suggestedTerms">Suggested search terms</label>
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Default/No Results Ordering</h2>

          <div>
            <input
              type="checkbox"
              id="usePopularSearches"
              className="mr-2 accent-black"
              checked={showPopularSearches}
              onChange={() => setShowPopularSearches(!showPopularSearches)}
            />
            <label className="text-sm" htmlFor="usePopularSearches">
              Use the most popular searches for search terms
            </label>
          </div>
        </div>

        {/* Columns Preview */}
        <div className={`flex ${layout === "two-column" ? "gap-6" : ""} mt-6`}>
          {Object.entries(columns).map(([columnName, items], index) => (
            <Column
              key={columnName}
              columnName={columnName}
              items={items}
              moveItem={moveItem}
              layout={layout}
              hideColumn={layout === "one-column" && index === 1}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

const Checkbox = ({ id, label, checked, onChange }) => (
  <div>
    <input
      type="checkbox"
      id={id}
      className="mr-2 accent-black"
      checked={checked}
      onChange={onChange}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);

const Column = ({ columnName, items, moveItem, layout, hideColumn }) => {
  const ref = useRef();
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const boundingRect = ref.current.getBoundingClientRect();
      const y = offset.y - boundingRect.top;

      const destIndex = Math.min(Math.max(0, Math.floor(y / 50)), items.length);
      moveItem(item.source, {
        destColumn: columnName,
        destIndex,
      });
    },
  });

  if (hideColumn) return null;

  return (
    <div
      ref={(node) => {
        ref.current = node;
        drop(node);
      }}
      className="flex-1 border border-black rounded-lg px-4 py-2 space-y-2"
    >
      <h4 className="text-sm font-semibold mb-2 ">{columnName}</h4>
      <div className="pb-4 ">
        {items.map((item, index) => (
          <DraggableItem
            key={`${item}-${index}`}
            item={item}
            source={{ sourceColumn: columnName, sourceIndex: index }}
          />
        ))}
      </div>
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
      className="flex items-center gap-1 mt-1 text-sm cursor-move "
    >
      <svg
        width="13"
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
      {item}
    </div>
  );
};

const Section = ({ columnName, sectionName, items, moveItem, isLast, borderTop }) => {
  const ref = useRef();
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item) => item.source.sourceColumn === columnName,
    drop: (item, monitor) => {
      if (item.source.sourceColumn !== columnName) return;

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
      className={`w-full ${!isLast && borderTop === true ? "border-r" : ""} border-black`}
    >
      <h4 className="text-base font-semibold px-2 text-left px-4 py-1">{formatName(sectionName)}</h4>
      <div className={`${borderTop ? "border-t" : ""} border-black pb-3`}>
        {items.map((item, index) => (
          <DraggableItem
            key={`${item}-${index}`}
            item={item}
            source={{
              sourceColumn: columnName,
              sourceSection: sectionName,
              sourceIndex: index,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NoResultsLayoutSettings;
