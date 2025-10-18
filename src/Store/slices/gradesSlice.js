import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseUrl } from "../BaseUrl";
import axios from "axios";

// Create grade
export const createGrade = createAsyncThunk(
  "grades/createGrade",
  async (gradeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BaseUrl}/api/grades`, gradeData);
      return response.data;
    } catch (err) {
      console.error(
        "createGrade error:",
        err.response?.data || err.message || err
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to create grade"
      );
    }
  }
);

// Update grade
export const updateGrade = createAsyncThunk(
  "grades/updateGrade",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BaseUrl}/api/grades/${id}`,
        updatedData
      );
      return response.data;
    } catch (err) {
      console.error(
        "updateGrade error:",
        err.response?.data || err.message || err
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to update grade"
      );
    }
  }
);

// Delete grade
export const deleteGrade = createAsyncThunk(
  "grades/deleteGrade",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BaseUrl}/api/grades/${id}`);
      return { id, message: response.data.message };
    } catch (err) {
      console.error(
        "deleteGrade error:",
        err.response?.data || err.message || err
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete grade"
      );
    }
  }
);

// Optionally: fetch grades for a class or student
export const fetchGradesForClass = createAsyncThunk(
  "grades/fetchGradesForClass",
  async (classId, { rejectWithValue }) => {
    try {
      // Always send token from localStorage if present
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BaseUrl}/api/classes/${classId}/grades`,
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      return { classId, grades: response.data };
    } catch (err) {
      console.error(
        "fetchGradesForClass error:",
        err.response?.data || err.message || err
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch grades"
      );
    }
  }
);

export const fetchGradesForStudent = createAsyncThunk(
  "grades/fetchGradesForStudent",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/students/${studentId}/grades`
      );
      return { studentId, grades: response.data };
    } catch (err) {
      console.error(
        "fetchGradesForStudent error:",
        err.response?.data || err.message || err
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch grades"
      );
    }
  }
);

const initialState = {
  grades: [],
  loading: false,
  error: null,
  classGrades: {}, // { [classId]: [grades] }
  studentGrades: {}, // { [studentId]: [grades] }
};

const gradesSlice = createSlice({
  name: "grades",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grades.push(action.payload);
      })
      .addCase(createGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGrade.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.grades.findIndex((g) => g._id === updated._id);
        if (idx !== -1) state.grades[idx] = updated;
      })
      .addCase(updateGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.grades = state.grades.filter((g) => g._id !== action.payload.id);
      })
      .addCase(deleteGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGradesForClass.fulfilled, (state, action) => {
        state.classGrades[action.payload.classId] = action.payload.grades;
      })
      .addCase(fetchGradesForStudent.fulfilled, (state, action) => {
        state.studentGrades[action.payload.studentId] = action.payload.grades;
      });
  },
});

export default gradesSlice.reducer;
