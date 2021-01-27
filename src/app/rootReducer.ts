import { combineReducers } from "@reduxjs/toolkit";
import inactAgentSlice from "../features/InformaticsChart/inactAgentSlice";
import hostSlice from "../features/InformaticsChart/hostSlice";
import cpuCoreSlice from "../features/InformaticsChart/cpuCoreSlice";
import rtimeSlice from "../features/InformaticsChart/rtimeSlice";
import ativeDBConnectionSlice from "../features/RacingBarChart/ativeDBConnectionSlice";
import ativeHttpCallSlice from "../features/RacingBarChart/ativeHttpCallSlice";
import ativeMethodSlice from "../features/RacingBarChart/ativeMethodSlice";
import ativeSocketSlice from "../features/RacingBarChart/ativeSocketSlice";
import ativeSQLSlice from "../features/RacingBarChart/ativeSQLSlice";

const rootReducer = combineReducers({
  inactAgent: inactAgentSlice.reducer,
  host: hostSlice.reducer,
  cpuCore: cpuCoreSlice.reducer,
  rtime: rtimeSlice.reducer,
  actDBConnection: ativeDBConnectionSlice.reducer,
  actHttpCall: ativeHttpCallSlice.reducer,
  actMethod: ativeMethodSlice.reducer,
  actSocket: ativeSocketSlice.reducer,
  actSQL: ativeSQLSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
