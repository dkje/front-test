import { createSlice } from "@reduxjs/toolkit";
import { spotInitialState } from "../../common/utils/fetchSpotInitialState";
import {
  createSpotThunkWithThrottle,
  createThunkReducers,
} from "../../common/utils/fetchStateUtils";

const actDBConnectionName = "actMethod";

const fetchActiveHttpCall = createSpotThunkWithThrottle({
  reducerName: actDBConnectionName,
  urlKey: "act_dbc",
  actionName: "fetchActiveDBConnection",
});

const activeHttpCallSlice = createSlice({
  name: actDBConnectionName,
  initialState: spotInitialState,
  reducers: {},
  extraReducers: createThunkReducers(fetchActiveHttpCall),
});

export const actions = {
  fetchActiveHttpCall,
};

export default activeHttpCallSlice;
