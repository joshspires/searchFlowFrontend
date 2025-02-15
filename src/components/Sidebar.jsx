import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import SidebarItem from "./SidebarItem";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const navigate = useNavigate(); // Initialize navigate function
  const location = useLocation(); // Get the current location
  const userId = useSelector((state) => state.auth.userInfo?.data?.userId);
  const userRole = useSelector((state) => state.auth.userInfo?.data?.userRole); // Fetch the user role
  const appVersion = __APP_VERSION__;

  // Define menu items conditionally
  const menuItems = [
    ...(userRole === "admin" // Exclude "Connected Websites" if the user is an admin
      ? [
        {
          text: "Admin",
          path: "/admin-dashboard",
          onClick: () => {
            window.location.href = "/admin-dashboard"; // Force reload and redirect
          },
        }]
      : []),
    ...(userRole !== "admin" // Exclude "Connected Websites" if the user is an admin
      ? [
        { text: "Connected Websites", path: `/connected-websites?userId=${userId}`, onClick: () => navigate(`/connected-websites?userId=${userId}`) }
      ]
      : []),
    { text: "Settings", path: "/settings", onClick: () => navigate("/settings") },


  ];
  const bottomMenuItems = [
    {
      text: "Documentation",
      path: "/documentation",
      onClick: () => {
        window.location.href = "https://www.searchflow.app/docs"; // Force reload and redirect
      }
    },
    {
      text: "Support",
      path: "/support",
      onClick: () => {
        window.location.href = "https://www.searchflow.app/support "; // Force reload and redirect
      }
    },

    {
      text: "Sign out",
      path: "/login",
      onClick: () => {
        localStorage.clear(); // Clear all local storage
        window.location.href = "/"; // Force reload and redirect
      },
    },
  ];

  // Helper function to check if a menu item is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen w-[18%] bg-white border-r border-secondary">
      {/* Header */}
      <div className="py-6 border-b border-secondary">
        <div className="text-2xl font-bold text-center text-primary font-bitter">searchFlow</div>
        <div className="text-xs text-center text-gray-500">version {appVersion}</div>
      </div>

      {/* Top Menu Items */}
      <div className="flex flex-col flex-grow">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            text={item.text}
            isActive={isActive(item.path)} // Dynamically set active state
            onClick={item.onClick} // Navigate to the respective path
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
            onClick={item.onClick} // Navigate to the respective path
          />
        ))}
      </div>
    </div>
  );
}
