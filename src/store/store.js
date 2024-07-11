import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootStateSlice from "./reducers/mainReducer";

export const store = configureStore({
  reducer: rootStateSlice,
})