import { combineReducers } from "@reduxjs/toolkit";
import inactAgentSlice from "../features/InformaticsChart/inactAgentSlice";
import hostSlice from "../features/InformaticsChart/hostSlice";
import cpuCoreSlice from "../features/InformaticsChart/cpuCoreSlice";
import rtimeSlice from "../features/InformaticsChart/rtimeSlice";

const rootReducer = combineReducers({
  inactAgent: inactAgentSlice.reducer,
  host: hostSlice.reducer,
  cpuCore: cpuCoreSlice.reducer,
  rtime: rtimeSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
