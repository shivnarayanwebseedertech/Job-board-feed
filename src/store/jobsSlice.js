import { createSlice } from "@reduxjs/toolkit";
import jobsData from "../data/jobs.json";

const initialState = {
  allJobs: jobsData,
  filteredJobs: jobsData,
  search: "",
  filter: { company: "", location: "" },
  sortBy: null,
  bookmarks: [],
  page: 1,
  perPage: 8,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setSearch(state, { payload }) {
      state.search = payload;
    },
    setFilter(state, { payload }) {
      state.filter = { ...state.filter, ...payload };
    },
    setSort(state, { payload }) {
      state.sortBy = payload;
    },
    toggleBookmark(state, { payload }) {
      state.bookmarks = state.bookmarks.includes(payload)
        ? state.bookmarks.filter((id) => id !== payload)
        : [...state.bookmarks, payload];
    },
    setPage(state, { payload }) {
      state.page = payload;
    },
    setPerPage(state, { payload }) {
      state.perPage = payload;
    },
    applyFilters(state) {
      let jobs = state.allJobs.slice();
      if (state.search) {
        const term = state.search.toLowerCase();
        jobs = jobs.filter(
          (j) =>
            j.title.toLowerCase().includes(term) ||
            j.company.toLowerCase().includes(term) ||
            j.description.toLowerCase().includes(term) ||
            (j.skills &&
              j.skills.some((skill) => skill.toLowerCase().includes(term)))
        );
      }
      if (state.filter.company)
        jobs = jobs.filter((j) => j.company === state.filter.company);
      if (state.filter.location)
        jobs = jobs.filter((j) => j.location === state.filter.location);
      if (state.sortBy === "date")
        // Sort jobs by date descending (latest first)
        jobs.sort((a, b) => parseDate(b.datePosted) - parseDate(a.datePosted));
      if (state.sortBy === "salary") jobs.sort((a, b) => b.salary - a.salary);
      state.filteredJobs = jobs;
    },
  },
});

function parseDate(str) {
  const [day, month, year] = str.split("-");
  return new Date(`${year}-${month}-${day}`);
}

export const {
  setSearch,
  setFilter,
  setSort,
  toggleBookmark,
  setPage,
  setPerPage,
  applyFilters,
} = jobsSlice.actions;
export default jobsSlice.reducer;
