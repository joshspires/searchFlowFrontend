import React from "react";
import Sidebar from "./../components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }) {
    return (
        <div className="flex h-screen">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 p-6 bg-white overflow-auto">
                {children}
            </div>
        </div>
    );
}
