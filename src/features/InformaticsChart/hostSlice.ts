import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { createThunkReducers } from "../../common/utils/fetchStateUtils";
import { SpotInitialState } from "../type";

const spotInitialState: SpotInitialState = {
  error: null,
  data: null,
  loading: false,
};

const hostName = "host";

const fetchHost = createAsyncThunk(`${hostName}/fetchHost`, async () => {
  const payload = await api.spot("host");
  return payload;
});

const hostSlice = createSlice({
  name: hostName,
  initialState: spotInitialState,
  reducers: {},
  extraReducers: createThunkReducers(fetchHost),
});

export const actions = {
  fetchHost,
};

export default hostSlice;
