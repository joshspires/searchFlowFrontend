import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const navigate = useNavigate(); // Initialize navigate function
  const location = useLocation(); // Get the current location

  const menuItems = [
    { text: "Connected Websites", path: "/connected-websites" },
    { text: "Settings", path: "/settings" },
  ];

  const bottomMenuItems = [
    { text: "Documentation", path: "/documentation" },
    { text: "Support", path: "/support" },
    { text: "Sign out", path: "/sign-out" },
  ];

  // Helper function to check if a menu item is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen w-[18%] bg-white border-r border-gray-300">
      {/* Header */}
      <div className="py-6 text-center text-2xl font-bold text-black border-b border-gray-300">
        searchFlow
      </div>

      {/* Top Menu Items */}
      <div className="flex flex-col flex-grow">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            text={item.text}
            isActive={isActive(item.path)} // Dynamically set active state
            onClick={() => navigate(item.path)} // Navigate to the respective path
          />
        ))}
      </div>

      {/* Bottom Menu Items */}
      <div className="flex flex-col">
        {bottomMenuItems.map((item, index) => (
          <SidebarItem
            key={`bottom-${index}`}
            text={item.text}
            isActive={isActive(item.path)} // Dynamically set active state
            onClick={() => navigate(item.path)} // Navigate to the respective path
          />
        ))}
      </div>
    </div>
  );
}
