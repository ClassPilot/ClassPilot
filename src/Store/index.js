import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slices/StudentSlice";
import classesReducer from "./slices/classesSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
    classes: classesReducer,
  },
});
export default store;
