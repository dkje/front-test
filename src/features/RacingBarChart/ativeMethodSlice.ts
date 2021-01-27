import { createSlice } from "@reduxjs/toolkit";
import { spotInitialState } from "../../common/utils/fetchSpotInitialState";
import {
  createSpotThunkWithThrottle,
  createThunkReducers,
} from "../../common/utils/fetchStateUtils";

const actMethodName = "actMethod";

const fetchActiveMethod = createSpotThunkWithThrottle({
  reducerName: actMethodName,
  urlKey: "act_method",
  actionName: "fetchActiveMethod",
});

const actMethodSlice = createSlice({
  name: actMethodName,
  initialState: spotInitialState,
  reducers: {},
  extraReducers: createThunkReducers(fetchActiveMethod),
});

export const actions = {
  fetchActiveMethod,
};

export default actMethodSlice;
