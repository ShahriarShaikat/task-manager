import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = projectSlice.actions;
export default projectSlice.reducer;
