import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseUrl } from "../BaseUrl";
import axios from "axios";

// Fetch classes
export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async () => {
    const response = await axios.get(`${BaseUrl}/api/classes`);
    return response.data;
  }
);

// Add class
export const addClasses = createAsyncThunk(
  "classes/addClasses",
  async (newClass) => {
    const response = await axios.post(`${BaseUrl}/api/classes`, newClass);
    return response.data;
  }
);

// ✅ Update class
export const updateClass = createAsyncThunk(
  "classes/updateClass",
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `${BaseUrl}/api/classes/${id}`,
      updatedData
    );
    return response.data; // Expecting updated class object from API
  }
);

// Delete class
export const deleteClass = createAsyncThunk(
  "classes/deleteClass",
  async (id) => {
    await axios.delete(`${BaseUrl}/api/classes/${id}`);
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
      // FETCH
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

      // ADD
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

      // ✅ UPDATE
      .addCase(updateClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.loading = false;
        const updatedClass = action.payload;
        const index = state.classes.findIndex(
          (cls) => cls.id === updatedClass.id
        );
        if (index !== -1) {
          state.classes[index] = updatedClass; // Replace with updated class object
        }
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter(
          (cls) => cls.id !== action.payload
        );
      });
  },
});

export default classesSlice.reducer;
