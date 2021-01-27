import { createSlice } from "@reduxjs/toolkit";
import { spotInitialState } from "../../common/utils/fetchSpotInitialState";
import {
  createSpotThunkWithThrottle,
  createThunkReducers,
} from "../../common/utils/fetchStateUtils";

const activeSocketName = "actSocket";

const fetchActiveSocket = createSpotThunkWithThrottle({
  reducerName: activeSocketName,
  urlKey: "act_socket",
  actionName: "fetchActiveSocket",
});

const activeHttpCallSlice = createSlice({
  name: activeSocketName,
  initialState: spotInitialState,
  reducers: {},
  extraReducers: createThunkReducers(fetchActiveSocket),
});

export const actions = {
  fetchActiveSocket,
};

export default activeHttpCallSlice;
