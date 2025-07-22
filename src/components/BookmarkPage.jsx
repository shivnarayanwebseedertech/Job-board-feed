import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleBookmark } from "../store/jobsSlice";
import Pagination from "./Pagination";

export default function BookmarkPage() {
  const { allJobs, bookmarks, page, perPage } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();
  const bookmarkedJobs = allJobs.filter((job) => bookmarks.includes(job.id));

  // Pagination logic for bookmarks
  const start = (page - 1) * perPage;
  const pageJobs = bookmarkedJobs.slice(start, start + perPage);

  return (
    <div className="min-h-[60vh]">
      <div className="flex items-center mb-8">
        <Link
          to="/"
          className="flex items-center px-4 py-2 rounded bg-white border shadow hover:bg-blue-50 transition mr-4"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="mr-2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Jobs
        </Link>
        <span className="flex items-center text-3xl font-extrabold text-blue-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#facc15"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 4a2 2 0 0 0-2 2v15l8-3 8 3V6a2 2 0 0 0-2-2H6z"
            />
          </svg>
          My Bookmarks
        </span>
      </div>
      <h2 className="text-xl font-bold mb-4">
        {bookmarkedJobs.length} Bookmarked Job
        {bookmarkedJobs.length !== 1 && "s"}
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pageJobs.length === 0 && (
          <li className="col-span-full text-center text-gray-500 py-8 bg-white rounded shadow">
            No bookmarked jobs yet.
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  width="22"
                  height="22"
                >
                  <path d="M5 3a2 2 0 0 0-2 2v13.382a1 1 0 0 0 1.447.894L10 17.118l5.553 2.158A1 1 0 0 0 17 18.382V5a2 2 0 0 0-2-2H5zm0 2h10v12.382l-5-1.944-5 1.944V5z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 20 20"
                  width="22"
                  height="22"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3a2 2 0 0 0-2 2v13.382a1 1 0 0 0 1.447.894L10 17.118l5.553 2.158A1 1 0 0 0 17 18.382V5a2 2 0 0 0-2-2H5z"
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
      {bookmarkedJobs.length > 4 && <Pagination />}
    </div>
  );
}
