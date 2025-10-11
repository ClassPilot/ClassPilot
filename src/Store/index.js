import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slices/StudentSlice";
import classesReducer from "./slices/classesSlice";
import profileReducer from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
    classes: classesReducer,
    profile: profileReducer,
  },
});
export default store;
