import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./slices/blogSlice";

const store = configureStore({
  reducer: {
    blog: blogSlice,
  },
});
export default store;
