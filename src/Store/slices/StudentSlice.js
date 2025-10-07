import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseUrl } from "../BaseUrl";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(`${BaseUrl}`);
    return response.data;
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudents",
  async (updateStudent) => {
    const response = await axios.post(`${BaseUrl}`, updateStudent);
    return response.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await axios.delete(`${BaseUrl}/${id}`);
    return id;
  }
);

const initialState = {
  students: [],
  loading: false,
  error: null,
};

const StudentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchStudents
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // addStudents
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // deleteStudents
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (students) => students.id !== action.payload
        );
      });
  },
});

export default StudentsSlice.reducer;
