import React, { useState, useRef } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ITEM_TYPE = "ITEM";

const layoutOptions = [
  { id: "oneTab", label: "One tab" },
  { id: "twoTabs", label: "Two tabs" },
  { id: "threeTabs", label: "Three tabs" },
];

const SearchPageConf = () => {
  const [columns, setColumns] = useState({
    searchResults: {
      products: ["Collect #1", "Collect #4", "Collect #2", "Collect #5"],
      blog: ["Products"],
      guides: ["Collect #5", "Collect #3"],
    },
    noResults: {
      suggestedTerms: ["Search term 1", "Search term 2", "Search term 3", "Search term 4", "Search term 5"],
      sectionOne: ["collection#1", "collection#2", "collection#3", "collection#4", "Search term 5"],
    },
    searchItems: {
      sectionOne: ["Product #1", "Product #4", "Product #2", "Product #5"],
      sectionTwo: ["Collect #1", "Collect #4", "Collect #2", "Collect #5"],
    },
  });

  const moveItem = (source, destination) => {
    const { sourceColumn, sourceSection, sourceIndex } = source;
    const { destColumn, destSection, destIndex } = destination;

    if (
      sourceColumn === destColumn &&
      sourceSection === destSection &&
      sourceIndex === destIndex
    ) {
      return;
    }

    const updatedColumns = { ...columns };
    const sourceItems = [...updatedColumns[sourceColumn][sourceSection]];
    const [movedItem] = sourceItems.splice(sourceIndex, 1);

    if (sourceColumn === destColumn && sourceSection === destSection) {
      sourceItems.splice(destIndex, 0, movedItem);
      updatedColumns[sourceColumn][sourceSection] = sourceItems;
    } else {
      const destItems = [...updatedColumns[destColumn][destSection]];
      destItems.splice(destIndex, 0, movedItem);
      updatedColumns[sourceColumn][sourceSection] = sourceItems;
      updatedColumns[destColumn][destSection] = destItems;
    }

    setColumns(updatedColumns);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-2 p-6 md:gap-10 lg:flex-row border border-black justify-between rounded-lg m-2">
        <div className="w-full">
          <h2 className="text-lg font-bold mb-4">Search results page</h2>
          <div className="mx-2">
            <h3 className="text-base font-semibold mb-2">Search results layout</h3>
            <div className="space-y-1">
              {layoutOptions.map(({ id, label }) => (
                <Checkbox key={id} id={id} label={label} />
              ))}
            </div>
          </div>
          <div className="space-y-6 mx-2 mt-2">
            <div>
              <h3 className="text-md font-medium mb-2">Search results content ordering</h3>
              <div className="flex justify-between mx-auto border rounded-lg border-black">
                {Object.entries(columns.searchResults).map(([sectionName, items], index, array) => (
                  <Section
                    key={sectionName}
                    columnName="searchResults"
                    sectionName={sectionName}
                    items={items}
                    moveItem={moveItem}
                    isLast={index === array.length - 1}
                    borderTop={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="md:mt-6  flex flex-col gap-2 mx-2 md:ml-0 w-full">
          <div className="mb-3 flex flex-col gap-3">
            <h3 className="text- font-semibold mb-1">No results content ordering</h3>
            <Checkbox label={"Suggested search terms"} />
            <h3 className="text- font-semibold mb-1">Search results content ordering</h3>
            <Checkbox label={"Use the most popular searches for search terms"} />
          </div>
          <ContentOrdering
            columns={columns.noResults}
            moveItem={moveItem}
            columnName="noResults"
          />
          <ContentOrdering
            columns={columns.searchItems}
            moveItem={moveItem}
            columnName="searchItems"
          />
        </div>
      </div>
    </DndProvider>
  );
};

const Checkbox = ({ id, label }) => (
  <div>
    <input type="checkbox" id={id} className="mr-2 accent-black text-sm accent-black" />
    <label className="text-sm " htmlFor={id}>{label}</label>
  </div>
);

const ContentOrdering = ({ title, columns, moveItem, columnName }) => (
  <>

    <div className="flex flex-col mb-3  border border-black rounded-lg">
      {Object.entries(columns).map(([sectionName, items], index, array) => (
        <Section
          key={sectionName}
          columnName={columnName}
          sectionName={sectionName}
          items={items}
          moveItem={moveItem}
          isLast={index === array.length - 1}
          borderTop={false}

        />
      ))}
    </div>
  </>
);

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

const DraggableItem = ({ item, source }) => {
  const [, drag] = useDrag({
    type: ITEM_TYPE,
    item: { source },
  });

  return (
    <div
      ref={drag}
      className="flex py-1 items-center gap-1 text-sm cursor-move px-4 "
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

const formatName = (name) =>
  name
    .replace(/([A-Z])/g, " $1")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();

export default SearchPageConf;
