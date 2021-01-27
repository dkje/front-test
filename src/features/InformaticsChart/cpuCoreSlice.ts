import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { createThunkReducers } from "../../common/utils/fetchStateUtils";
import { SpotResponseState } from "../type";

const spotInitialState: SpotResponseState = {
  error: null,
  data: null,
  loading: false,
};

const cpuCoreName = "cpucore";

const fetchCpuCore = createAsyncThunk(
  `${cpuCoreName}/fetchCpuCore`,
  async () => {
    const payload = await api.spot("cpucore");
    return payload;
  }
);

const hostSlice = createSlice({
  name: cpuCoreName,
  initialState: spotInitialState,
  reducers: {},
  extraReducers: createThunkReducers(fetchCpuCore),
});

export const actions = {
  fetchCpuCore,
};

export default hostSlice;
