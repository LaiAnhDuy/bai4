import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";

export const makeStore = () => configureStore({
  reducer: combineReducers({
    todo: todoReducer,
  }),
});
