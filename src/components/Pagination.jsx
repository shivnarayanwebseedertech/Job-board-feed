import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setPerPage } from '../store/jobsSlice';

export default function Pagination() {
  const { filteredJobs, page, perPage } = useSelector(state => state.jobs);
  const total = Math.ceil(filteredJobs.length / perPage);
  const dispatch = useDispatch();

  function handlePrev() {
    if (page > 1) dispatch(setPage(page - 1));
  }
  function handleNext() {
    if (page < total) dispatch(setPage(page + 1));
  }
  function handlePerPageChange(e) {
    dispatch(setPerPage(Number(e.target.value)));
    dispatch(setPage(1));
  }

  return (
    <div className="bg-white rounded-xl shadow flex flex-col md:flex-row md:items-center justify-between px-6 py-4 mt-8 mb-4">
      <div className="flex items-center mb-4 md:mb-0">
        <span className="mr-2 text-gray-700 font-medium">Show</span>
        <select
          value={perPage}
          onChange={handlePerPageChange}
          className="border rounded px-3 py-1 text-lg font-semibold bg-white focus:outline-none"
        >
          {[4, 8, 12, 16].map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span className="ml-2 text-gray-700 font-medium">per page</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className={`w-12 h-10 rounded-lg border text-xl flex items-center justify-center transition ${
            page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 text-gray-700"
          }`}
        >
          &#60;
        </button>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => dispatch(setPage(i + 1))}
            className={`w-12 h-10 rounded-lg border text-lg font-semibold flex items-center justify-center transition ${
              page === i + 1
                ? "bg-gray-900 text-white"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleNext}
          disabled={page === total}
          className={`w-12 h-10 rounded-lg border text-xl flex items-center justify-center transition ${
            page === total || total === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 text-gray-700"
          }`}
        >
          &#62;
        </button>
      </div>
      <div className="text-gray-700 font-medium mt-4 md:mt-0">
        Page {page} of {total}
      </div>
    </div>
  );
}