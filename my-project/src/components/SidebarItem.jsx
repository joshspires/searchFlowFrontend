import * as React from "react";

export default function SidebarItem({ text, isActive, onClick }) {
  return (
    <div
      className={`flex items-center px-4 py-3 text-sm cursor-pointer border-b border-gray-200 ${
        isActive
          ? "bg-gray-100 text-black font-semibold"
          : "text-gray-700 hover:bg-gray-100 hover:text-black"
      }`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {text}
    </div>
  );
}
