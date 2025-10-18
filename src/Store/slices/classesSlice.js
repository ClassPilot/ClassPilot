// List students in a class
export const fetchClassStudents = createAsyncThunk(
  "classes/fetchClassStudents",
  async (classId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BaseUrl}/api/classes/${classId}/students`
      );
      return { classId, students: response.data };
    } catch (err) {
      console.error(
        "fetchClassStudents error:",
        err.response?.data || err.message || err
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch students"
      );
    }
  }
);

// Enroll students in a class
export const enrollStudentsInClass = createAsyncThunk(
  "classes/enrollStudentsInClass",
  async ({ classId, studentIds }, { rejectWithValue }) => {
    try {
      // Always send token from localStorage if present
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BaseUrl}/api/classes/${classId}/students`,
        {
          student_ids: studentIds,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      return {
        classId,
        enrollmentIds: response.data.enrollmentIds,
        message: response.data.message,
      };
    } catch (err) {
      console.error(
        "enrollStudentsInClass error:",
        err.response?.data || err.message || err
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to enroll students"
      );
    }
  }
);

// Remove student from class
export const removeStudentFromClass = createAsyncThunk(
  "classes/removeStudentFromClass",
  async ({ classId, studentId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BaseUrl}/api/classes/${classId}/students/${studentId}`
      );
      return { classId, studentId, message: response.data.message };
    } catch (err) {
      console.error(
        "removeStudentFromClass error:",
        err.response?.data || err.message || err
      );
      return rejectWithValue(
        err.response?.data?.message || "Failed to remove student"
      );
    }
  }
);
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
  classStudents: {}, // { [classId]: [students] }
  enrollMessage: null,
  removeMessage: null,
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
      })

      // List students in class
      .addCase(fetchClassStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.classStudents[action.payload.classId] = action.payload.students;
      })
      .addCase(fetchClassStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Enroll students in class
      .addCase(enrollStudentsInClass.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.enrollMessage = null;
      })
      .addCase(enrollStudentsInClass.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollMessage = action.payload.message;
      })
      .addCase(enrollStudentsInClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove student from class
      .addCase(removeStudentFromClass.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.removeMessage = null;
      })
      .addCase(removeStudentFromClass.fulfilled, (state, action) => {
        state.loading = false;
        state.removeMessage = action.payload.message;
        // Remove student from classStudents
        const { classId, studentId } = action.payload;
        if (state.classStudents[classId]) {
          state.classStudents[classId] = state.classStudents[classId].filter(
            (s) => s._id !== studentId
          );
        }
      })
      .addCase(removeStudentFromClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default classesSlice.reducer;
