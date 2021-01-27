import { createSlice } from "@reduxjs/toolkit";
import { spotInitialState } from "../../common/utils/fetchSpotInitialState";
import {
  createSpotThunkWithThrottle,
  createThunkReducers,
} from "../../common/utils/fetchStateUtils";

const actSQLName = "actSQL";

const fetchActiveSQL = createSpotThunkWithThrottle({
  reducerName: actSQLName,
  urlKey: "act_sql",
  actionName: "fetchActiveSql",
});

const actSQLSlice = createSlice({
  name: actSQLName,
  initialState: spotInitialState,
  reducers: {},
  extraReducers: createThunkReducers(fetchActiveSQL),
});

export const actions = {
  fetchActiveSQL,
};

export default actSQLSlice;
