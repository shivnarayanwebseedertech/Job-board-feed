import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleBookmark } from "../store/jobsSlice";
import SearchFilter from "./SearchFilter";
import SortControls from "./SortControls";
import Pagination from "./Pagination";

export default function JobList() {
  // ...existing code...
  const { filteredJobs, bookmarks, page, perPage } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();

  const start = (page - 1) * perPage;
  const pageJobs = filteredJobs.slice(start, start + perPage);
  // ...existing code...

  return (
    <div>
      <SearchFilter />
      <SortControls />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{filteredJobs.length} Jobs Found</h2>
        <span className="text-gray-500 text-sm">
          Showing {filteredJobs.length === 0 ? 0 : start + 1}-
          {Math.min(start + perPage, filteredJobs.length)} of{" "}
          {filteredJobs.length}
        </span>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pageJobs.length === 0 && (
          <li className="col-span-full text-center text-gray-500 py-8 bg-white rounded shadow">
            No jobs found. Try adjusting your search or filters.
          </li>
        )}
        {pageJobs.map((job) => (
          <li
            key={job.id}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col h-full relative"
          >
            <button
              onClick={() => dispatch(toggleBookmark(job.id))}
              className={`absolute top-4 right-4 text-2xl transition-colors ${
                bookmarks.includes(job.id)
                  ? "text-yellow-400 hover:text-yellow-500"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
              title={
                bookmarks.includes(job.id) ? "Remove Bookmark" : "Add Bookmark"
              }
              aria-label="Toggle bookmark"
            >
              {bookmarks.includes(job.id) ? (
                // Filled bookmark icon (saved)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#facc15"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                >
                  <path d="M6 4a2 2 0 0 0-2 2v15l8-3 8 3V6a2 2 0 0 0-2-2H6z" />
                </svg>
              ) : (
                // Outline bookmark icon (unsaved)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="#2563eb"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 4a2 2 0 0 0-2 2v15l8-3 8 3V6a2 2 0 0 0-2-2H6z"
                  />
                </svg>
              )}
            </button>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {job.title}
            </h3>
            <a
              href={job.companyUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline mb-2"
            >
              {job.company}
            </a>
            <div className="flex items-center text-gray-600 text-sm mb-2 space-x-4">
              <span className="flex items-center">
                {/* Location icon */}
                <svg
                  className="mr-1"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 2C8 2 5 5.5 5 9.5c0 5.5 7 12 7 12s7-6.5 7-12C19 5.5 16 2 12 2z" />
                </svg>
                {job.location}
              </span>
              <span className="flex items-center">
                {/* Salary icon */}
                {job.salary ? `₹ ${job.salary.toLocaleString()}` : "N/A"}
              </span>
            </div>
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <span className="flex items-center">
                {/* Calendar icon */}
                <svg
                  className="mr-1"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Posted: {job.datePosted}
              </span>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-3">
              {job.description || "No description provided."}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.skills &&
                job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags &&
                job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
            </div>
            <div className="mt-auto flex justify-end">
              <a
                href={job.applyUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Apply Now
              </a>
            </div>
          </li>
        ))}
      </ul>
      <Pagination />
    </div>
  );
}
