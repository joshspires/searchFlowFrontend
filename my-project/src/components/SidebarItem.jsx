import * as React from "react";

export default function SidebarItem({ text, isActive, onClick }) {
  return (
    <div
      className={`flex items-center px-4 py-3 text-sm cursor-pointer border-b border-secondary`}
      onClick={() => {
        console.log(`SidebarItem clicked: ${text}`); // Debug log
        onClick(); // Safely invoke onClick
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {text}
    </div>
  );
}
