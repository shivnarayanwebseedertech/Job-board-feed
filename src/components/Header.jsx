import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { bookmarks } = useSelector(state => state.jobs);
  const location = useLocation();

  return (
    <header className="mb-8 bg-gradient-to-r from-blue-50 to-blue-100 border border-gray-300 shadow-lg p-6 rounded-xl">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-md shadow-md">
            <span className="text-3xl">💼</span>
          </div>
          
          <div>
            <h1 className="text-3xl font-extrabold text-blue-800 tracking-tight">JobBoard</h1>
            <p className="text-sm text-blue-500 font-medium">Find your next opportunity</p>
          </div>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <NavLink
            to="/bookmarks"
            className={({ isActive }) =>
              `flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow ${
                (isActive || location.pathname === "/bookmarks")
                  ? "ring-2 ring-blue-400"
                  : ""
              }`
            }
          >
            {/* Outline bookmark icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" width="22" height="22" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4a2 2 0 0 0-2 2v15l8-3 8 3V6a2 2 0 0 0-2-2H6z"/>
            </svg>
            Bookmarks
            <span className="font-normal">({bookmarks.length})</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}