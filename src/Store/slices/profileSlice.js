import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAGE_KEY = "classpilot_profile";

function loadProfileFromStorage() {
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch (e) {
		return null;
	}
}

function saveProfileToStorage(profile) {
	try {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
	} catch (e) {
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
};

const initialFromStorage = loadProfileFromStorage();

const initialState = initialFromStorage
	? { user: initialFromStorage, loaded: true }
	: defaultState;

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		loadProfile(state) {
			const stored = loadProfileFromStorage();
			if (stored) {
				state.user = stored;
				state.loaded = true;
			} else {
				state.loaded = true;
			}
		},
		updatePersonalInfo(state, action) {
			const { fullName, email } = action.payload;
			if (typeof fullName === "string") state.user.fullName = fullName;
			if (typeof email === "string") state.user.email = email;
			saveProfileToStorage(state.user);
		},
		updateAvatar(state, action) {
			const { avatarUrl } = action.payload;
			state.user.avatarUrl = avatarUrl || "";
			saveProfileToStorage(state.user);
		},
		changePassword(state, action) {
			const { currentPassword, newPassword } = action.payload || {};
			const existingPassword = state.user.password || "";
			// If there is an existing password, it must match
			if (existingPassword && existingPassword !== String(currentPassword || "")) {
				throw new Error("Current password is incorrect");
			}
			state.user.password = String(newPassword || "");
			saveProfileToStorage(state.user);
		},
		setUploading(state, action) {
			state.uploading = action.payload;
		},
		resetProfile(state) {
			state.user = { fullName: "", email: "", avatarUrl: "", password: "" };
			saveProfileToStorage(state.user);
		},
		deleteAccount(state) {
			try {
				localStorage.removeItem(LOCAL_STORAGE_KEY);
			} catch (e) {
				// ignore
			}
			state.user = { fullName: "", email: "", avatarUrl: "", password: "" };
			state.loaded = true;
		},
	},
});

export const { loadProfile, updatePersonalInfo, updateAvatar, changePassword, setUploading, resetProfile, deleteAccount } = profileSlice.actions;

export default profileSlice.reducer;


