import React, { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";

import BookmarkPage from "./components/BookmarkPage";
import { applyFilters } from "./store/jobsSlice";
import JobList from "./components/joblist";
import Header from "./components/Header";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(applyFilters());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <Header />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/bookmarks" element={<BookmarkPage />} />
      </Routes>
    </div>
  );
}