import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch, setFilter, applyFilters, setPage } from '../store/jobsSlice';

export default function SearchFilter() {
  const { search, filter, allJobs } = useSelector(state => state.jobs);
  const dispatch = useDispatch();

  const companies = [...new Set(allJobs.map(j => j.company))];
  const locations = [...new Set(allJobs.map(j => j.location))];

  function onChange(field, value) {
    if (field === 'search') dispatch(setSearch(value));
    else dispatch(setFilter({ [field]: value }));
    dispatch(setPage(1));
    dispatch(applyFilters());
  }

  function onClear() {
    dispatch(setSearch(""));
    dispatch(setFilter({ company: "", location: "" }));
    dispatch(setPage(1));
    dispatch(applyFilters());
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-2 md:space-y-0">
    {/* Search bar left */}
    <div className="relative flex-1 max-w-xs md:max-w-sm w-full">
      <input
        type="text"
        value={search}
        onChange={e => onChange('search', e.target.value)}
        placeholder="Search jobs, titles, skills..."
        className="border py-2 rounded w-full pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
      />
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        {/* Standard search icon */}
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </span>
    </div>
    {/* Filters right */}
    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mt-2 md:mt-0">
      <select
        value={filter.company}
        onChange={e => onChange('company', e.target.value)}
        className="border p-2 rounded min-w-[160px] focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
      >
        <option value=""> All Companies</option>
        {companies.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select
        value={filter.location}
        onChange={e => onChange('location', e.target.value)}
        className="border p-2 rounded min-w-[160px] focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
      >
        <option value=""> All Locations</option>
        {locations.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
      <button
        onClick={onClear}
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
        type="button"
      >
        Clear
      </button>
    </div>
  </div>
  )
};