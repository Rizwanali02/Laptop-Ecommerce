import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import CreateProducts from "./CreateProducts";
import MyProducts from "./MyProducts";
import { useAuthContext } from "../../context/AuthContext";




const Dashboard = () => {
  const { mode } = useAuthContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("my-products"); 

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  const handleCreateProductsClick = useCallback(() => {
    setActiveButton("create-products");
  }, []);

  const handleMyProductsClick = useCallback(() => {
    setActiveButton("my-products");
  }, []);
  
  return (
    <div className={`flex h-screen bg-gray-200`}>
      {/* Sidebar */}
      <div
        className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div
          className={`flex flex-col h-full ${
            mode === "dark" ? "bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white" : "text-black"
          }`}
        >
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center">
              <span className=" text-2xl mx-2 font-semibold">Dashboard</span>
            </div>
          </div>
          <nav className="px-2 mt-4 space-y-1">
            {/* Navigation items */}
            <Link
              to="/"
              className={`flex items-center px-2 py-2 transition-colors duration-200 transform btn ${
                activeButton === "" ? "text-white bg-slate-900" : "text-gray-700 bg-gray-200"
              } hover:bg-slate-800 `}
            >
              <span className="ml-2">Home</span>
            </Link>
            <button
              onClick={handleMyProductsClick}
              className={`flex w-full items-center px-2 py-2 transition-colors duration-200 transform btn ${
                activeButton === "my-products" ? "text-white bg-slate-900" : "text-gray-700 bg-gray-200"
              } hover:bg-slate-800 `}
              aria-label="My Products"
            >
              <span className="ml-2">MY PRODUCTS</span>
            </button>
            <button
              onClick={handleCreateProductsClick}
              className={`flex w-full items-center px-2 py-2 transition-colors duration-200 transform btn ${
                activeButton === "create-products" ? "text-white bg-slate-900" : "text-gray-700 bg-gray-200"
              } hover:bg-slate-800 `}
              aria-label="Create Products"
            >
              <span className="ml-2">CREATE PRODUCTS</span>
            </button>
            {/* Add more navigation items here */}
          </nav>
          {/* Close button for mobile screens */}
          <button
            onClick={toggleSidebar}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700 lg:hidden"
            aria-label="Close Sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className={`flex h-11 justify-between items-center p-6   bg-gray-800`}>
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none lg:hidden"
              aria-label="Toggle Sidebar"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="flex flex-col">
            {activeButton === "create-products" ? (
              <CreateProducts />
            ) : (
              <MyProducts />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

