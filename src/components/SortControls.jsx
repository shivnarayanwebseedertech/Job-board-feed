import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort, applyFilters } from '../store/jobsSlice';

export default function SortControls() {
  const sortBy = useSelector(state => state.jobs.sortBy);
  const dispatch = useDispatch();

  function onSort(val) {
    dispatch(setSort(val));
    dispatch(applyFilters());
  }

  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => onSort('date')}
        className={`px-3 py-1 rounded ${sortBy === 'date' ? 'bg-blue-600 text-white' : 'border'}`}
      >Newest</button>
      <button
        onClick={() => onSort('salary')}
        className={`px-3 py-1 rounded ${sortBy === 'salary' ? 'bg-blue-600 text-white' : 'border'}`}
      >Highest Salary</button>
    </div>
  );
}