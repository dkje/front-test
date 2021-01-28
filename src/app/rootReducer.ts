import { combineReducers } from "@reduxjs/toolkit";
import projectInfoSlice from "../features/InformaticsChart/projectInfoSlice";

const rootReducer = combineReducers({
  projectInfo: projectInfoSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
