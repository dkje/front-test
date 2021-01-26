import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

export default configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), logger],
});
