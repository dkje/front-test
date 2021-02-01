import { combineReducers } from "@reduxjs/toolkit";
import projectInfoSlice from "features/InformaticsChart/projectInfoSlice";
import activeStatusSlice from "features/RacingBarChart/AtiveStatusSlice";

const rootReducer = combineReducers({
  projectInfo: projectInfoSlice.reducer,
  activeStatus: activeStatusSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
