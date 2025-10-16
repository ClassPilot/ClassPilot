// Fetch grades for a student
export const fetchGradesForStudent = createAsyncThunk(
  "students/fetchGradesForStudent",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/students/${studentId}/grades`
      );
      return { studentId, grades: response.data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch grades"
      );
    }
  }
);
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BaseUrl } from "../BaseUrl";
import axios from "axios";

// Fetch students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(`${BaseUrl}/api/students`);
    return response.data;
  }
);

// Add student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (newStudent) => {
    const response = await axios.post(`${BaseUrl}/api/students`, newStudent);
    return response.data;
  }
);

// Update student ✅
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `${BaseUrl}/api/students/${id}`,
      updatedData
    );
    return response.data; // Expecting the updated student object in response
  }
);

// Delete student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await axios.delete(`${BaseUrl}/api/students/${id}`);
    return id;
  }
);

const initialState = {
  students: [],
  loading: false,
  error: null,
  studentGrades: {}, // { [studentId]: [grades] }
};

const StudentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
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

      // ADD
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

      // UPDATE ✅
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        const updatedStudent = action.payload;
        const index = state.students.findIndex(
          (student) => student.id === updatedStudent.id
        );
        if (index !== -1) {
          state.students[index] = updatedStudent; // replace with updated object
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
      })

      // Fetch grades for student
      .addCase(fetchGradesForStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGradesForStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.studentGrades[action.payload.studentId] = action.payload.grades;
      })
      .addCase(fetchGradesForStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default StudentsSlice.reducer;
