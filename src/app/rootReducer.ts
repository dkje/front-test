import { combineReducers } from "@reduxjs/toolkit";
import projectInfoSlice from "features/InformaticsChart/projectInfoSlice";
import activeStatusSlice from "features/RacingBarChart/AtiveStatusSlice";
import activeVisitors5m from "features/LineChart/ActiveVisitors5mSlice";
import expectionSerise from "features/DonutChart/ExecptionSlice";
import cpuUsageRate from "features/HalfDonutChart/CpuUsageRateSlice";

const rootReducer = combineReducers({
  projectInfo: projectInfoSlice.reducer,
  activeStatus: activeStatusSlice.reducer,
  activeVisitors5m: activeVisitors5m.reducer,
  exceptionSerise: expectionSerise.reducer,
  cpuUsageRate: cpuUsageRate.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
