import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";

// set token on axios
const setAuthToken = (token) => {
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete axios.defaults.headers.common["Authorization"];
};

// load token from storage
const storedToken = localStorage.getItem("token");
if (storedToken) setAuthToken(storedToken);

// configure axios (adjust withCredentials if backend uses cookies)
axios.defaults.withCredentials = false;

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BaseUrl}/api/auth/me`);
      return res.data.user ?? res.data;
    } catch (err) {
      console.error(
        "checkAuthStatus error:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BaseUrl}/api/auth/login`, credentials);
      const { token, user } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
      }
      return user ?? res.data;
    } catch (err) {
      console.error("login error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BaseUrl}/api/auth/register`, payload);
      const { token, user } = res.data;
      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
      }
      return user ?? res.data;
    } catch (err) {
      console.error("register error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  setAuthToken(null);
  return true;
});

const initialState = {
  user: null,
  isAuthenticated: !!storedToken,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (s) => {
        s.status = "loading";
      })
      .addCase(checkAuthStatus.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload;
        s.isAuthenticated = true;
        s.error = null;
      })
      .addCase(checkAuthStatus.rejected, (s) => {
        s.status = "idle";
        s.user = null;
        s.isAuthenticated = false;
      })

      .addCase(login.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload;
        s.isAuthenticated = true;
        s.error = null;
      })
      .addCase(login.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || a.error;
      })

      .addCase(register.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(register.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.user = a.payload;
        s.isAuthenticated = true;
        s.error = null;
      })
      .addCase(register.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload || a.error;
      })

      .addCase(logout.fulfilled, (s) => {
        s.status = "idle";
        s.user = null;
        s.isAuthenticated = false;
        s.error = null;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
