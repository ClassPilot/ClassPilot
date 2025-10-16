import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";

const LOCAL_STORAGE_KEY = "classpilot_profile";

function loadProfileFromStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveProfileToStorage(profile) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

const defaultState = {
  user: {
    fullName: "",
    email: "",
    avatarUrl: "", // Cloudinary URL for the profile picture
    password: "", // stored locally for demo purposes only
  },
  loaded: false,
  uploading: false,
  status: "idle",
  error: null,
};

const initialFromStorage = loadProfileFromStorage();

const initialState = initialFromStorage
  ? {
      user: initialFromStorage,
      loaded: true,
      uploading: false,
      status: "succeeded",
      error: null,
    }
  : defaultState;

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // internal sync reducers (prefixed for clarity)
    _setProfile(state, action) {
      const raw = action.payload || {};
      // normalize backend user shape (backend returns `name`, `_id`)
      state.user = {
        id: raw._id ?? raw.id ?? null,
        fullName: raw.name ?? raw.fullName ?? "",
        email: raw.email ?? "",
        avatarUrl: raw.avatarUrl ?? raw.avatar ?? raw.picture ?? "",
        password: raw.password ?? "",
        role: raw.role ?? null,
        createdAt: raw.createdAt ?? null,
        updatedAt: raw.updatedAt ?? null,
      };
      saveProfileToStorage(state.user);
    },
    _setLoaded(state, action) {
      state.loaded = !!action.payload;
    },
    _updatePersonalInfo(state, action) {
      const { fullName, email } = action.payload || {};
      if (typeof fullName === "string") state.user.fullName = fullName;
      if (typeof email === "string") state.user.email = email;
      saveProfileToStorage(state.user);
    },
    _updateAvatar(state, action) {
      const { avatarUrl } = action.payload || {};
      state.user.avatarUrl = avatarUrl || "";
      saveProfileToStorage(state.user);
    },
    _changePassword(state, action) {
      const { currentPassword, newPassword } = action.payload || {};
      const existingPassword = state.user.password || "";
      if (
        existingPassword &&
        existingPassword !== String(currentPassword || "")
      ) {
        throw new Error("Current password is incorrect");
      }
      state.user.password = String(newPassword || "");
      saveProfileToStorage(state.user);
    },
    setUploading(state, action) {
      state.uploading = !!action.payload;
    },
    resetProfile(state) {
      state.user = { fullName: "", email: "", avatarUrl: "", password: "" };
      saveProfileToStorage(state.user);
    },
    _deleteAccount(state) {
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } catch {
        // ignore
      }
      state.user = { fullName: "", email: "", avatarUrl: "", password: "" };
      state.loaded = true;
    },
    _setStatus(state, action) {
      state.status = action.payload;
    },
    _setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Async thunks that mirror the previous sync API but are async-friendly for components
export const loadProfile = createAsyncThunk(
  "profile/loadProfile",
  async (_, { dispatch, rejectWithValue }) => {
    // Try backend first using documented auth endpoint
    try {
      const res = await axios.get(`${BaseUrl}/api/auth/me`);
      const data = res.data?.user ?? res.data;
      if (data) {
        dispatch(profileSlice.actions._setProfile(data));
        dispatch(profileSlice.actions._setLoaded(true));
        return data;
      }
    } catch (err) {
      // fallback to local storage
      const stored = loadProfileFromStorage();
      if (stored) {
        dispatch(profileSlice.actions._setProfile(stored));
        dispatch(profileSlice.actions._setLoaded(true));
        return stored;
      }
      // allow caller to handle failures
      dispatch(profileSlice.actions._setLoaded(true));
      return rejectWithValue(err.response?.data || err.message);
    }
    // no data: try local storage as fallback
    const stored = loadProfileFromStorage();
    if (stored) {
      dispatch(profileSlice.actions._setProfile(stored));
      dispatch(profileSlice.actions._setLoaded(true));
      return stored;
    }
    dispatch(profileSlice.actions._setLoaded(true));
    return null;
  }
);

export const updatePersonalInfo = createAsyncThunk(
  "profile/updatePersonalInfo",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      // prefer backend update (attempt auth/me)
      const res = await axios.put(`${BaseUrl}/api/auth/me`, payload);
      const data = res.data?.user ?? res.data;
      dispatch(profileSlice.actions._updatePersonalInfo(data || payload));
      return data || payload;
    } catch (err) {
      // fallback to local update
      try {
        dispatch(profileSlice.actions._updatePersonalInfo(payload));
        return payload;
      } catch {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "profile/updateAvatar",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put(`${BaseUrl}/api/auth/me/avatar`, payload);
      const data = res.data?.user ?? res.data;
      dispatch(profileSlice.actions._updateAvatar(data || payload));
      return data || payload;
    } catch (err) {
      // fallback
      try {
        dispatch(profileSlice.actions._updateAvatar(payload));
        return payload;
      } catch {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  }
);

export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      // call backend change-password endpoint (attempt auth namespace)
      const res = await axios.post(
        `${BaseUrl}/api/auth/change-password`,
        payload
      );
      // backend could return updated user
      const data = res.data?.user ?? res.data;
      if (data) dispatch(profileSlice.actions._setProfile(data));
      return data || { success: true };
    } catch (err) {
      // fallback to local change (existing behavior)
      try {
        dispatch(profileSlice.actions._changePassword(payload));
        return { success: true };
      } catch {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "profile/deleteAccount",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${BaseUrl}/api/auth/me`);
      dispatch(profileSlice.actions._deleteAccount());
      return true;
    } catch (err) {
      // fallback: clear local data
      try {
        dispatch(profileSlice.actions._deleteAccount());
        return true;
      } catch {
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  }
);

// Export the sync action to control uploading state directly
export const { setUploading, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
