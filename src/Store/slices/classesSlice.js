import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseUrl } from "../BaseUrl";
import axios from "axios";

export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async () => {
    const response = await axios.get(`${BaseUrl}`);
    return response.data;
  }
);

export const addClasses = createAsyncThunk(
  "classes/addClasses",
  async (updateClass) => {
    const response = await axios.post(`${BaseUrl}`, updateClass);
    return response.data;
  }
);

export const deleteClass = createAsyncThunk(
  "classes/deleteClasses",
  async (id) => {
    await axios.delete(`${BaseUrl}/${id}`);
    return id;
  }
);

const initialState = {
  classes: [],
  loading: false,
  error: null,
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchStudents
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // addStudents
      .addCase(addClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes.push(action.payload);
      })
      .addCase(addClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // deleteStudents
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter(
          (classes) => classes.id !== action.payload
        );
      });
  },
});

export default classesSlice.reducer;
