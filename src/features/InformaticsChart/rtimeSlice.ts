import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { createThunkReducers } from "../../common/utils/fetchStateUtils";
import { SpotResponseState } from "../type";

const spotInitialState: SpotResponseState = {
  error: null,
  data: null,
  loading: false,
};

const rtimeName = "host";

const fetchRtime = createAsyncThunk(`${rtimeName}/fetchRtime`, async () => {
  const payload = await api.spot("rtime");
  return payload;
});

const rtimeSlice = createSlice({
  name: rtimeName,
  initialState: spotInitialState,
  reducers: {},
  extraReducers: createThunkReducers(fetchRtime),
});

export const actions = {
  fetchRtime,
};

export default rtimeSlice;
