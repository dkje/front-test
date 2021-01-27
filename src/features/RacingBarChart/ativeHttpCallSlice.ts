import { createSlice } from "@reduxjs/toolkit";
import { spotInitialState } from "../../common/utils/fetchSpotInitialState";
import {
  createSpotThunkWithThrottle,
  createThunkReducers,
} from "../../common/utils/fetchStateUtils";

const actHttpCallName = "actMethod";

const fetchActiveHttpCall = createSpotThunkWithThrottle({
  reducerName: actHttpCallName,
  urlKey: "act_httpc",
  actionName: "fetchActiveHttpCall",
});

const activeHttpCallSlice = createSlice({
  name: actHttpCallName,
  initialState: spotInitialState,
  reducers: {},
  extraReducers: createThunkReducers(fetchActiveHttpCall),
});

export const actions = {
  fetchActiveHttpCall,
};

export default activeHttpCallSlice;
