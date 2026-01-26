import React from "react";
import Sidebar from "./Sidebar/sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar always visible */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 w-full min-h-screen bg-gray-100 p-6">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
