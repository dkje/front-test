import { combineReducers } from "@reduxjs/toolkit";
import projectInfoSlice from "features/InformaticsChart/projectInfoSlice";
import activeStatusSlice from "features/RacingBarChart/AtiveStatusSlice";
import ActiveVisitors5m from "features/LineChart/ActiveVisitors5mSlice";
import ExpectionSerise from "features/DounutChart/ExecptionSlice";

const rootReducer = combineReducers({
  projectInfo: projectInfoSlice.reducer,
  activeStatus: activeStatusSlice.reducer,
  activeVisitors5m: ActiveVisitors5m.reducer,
  exceptionSerise: ExpectionSerise.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
