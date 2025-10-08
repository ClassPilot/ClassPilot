import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slices/StudentSlice";
import classesReducer from "./slices/classesSlice";
import AuthReducer from "./slices/AuthSlice";
const store = configureStore({
  reducer: {
    students: studentReducer,
    classes: classesReducer,
    auth: AuthReducer,
  },
});
export default store;
