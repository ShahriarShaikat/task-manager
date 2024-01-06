import { createSlice } from "@reduxjs/toolkit";

const initialState = { search: "", project: [] };

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    loadProjects: (state, action) => {
      state.project = action.payload.map((p) => ({ ...p, check: true }));
    },
    setProjectChecked: (state, action) => {
      state.project = state.project.map((p) => {
        // eslint-disable-next-line eqeqeq
        if (p.id == action.payload.id) {
          return { ...p, check: action.payload.check };
        } else return p;
      });
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { loadProjects, setProjectChecked, setSearch } =
  filterSlice.actions;
export default filterSlice.reducer;
