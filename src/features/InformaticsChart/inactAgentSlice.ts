import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { createThunkReducers } from "../../common/utils/fetchStateUtils";
import { SpotInitialState } from "../type";

export const spotInitialState: SpotInitialState = {
  error: null,
  data: null,
  loading: false,
};

const inactAgentName = "inactAgent";

const fetchInactAgent = createAsyncThunk(
  `${inactAgentName}/fetchInactAgent`,
  async () => {
    const payload = await api.spot("inact_agent");
    return payload;
  }
);

const inactAgentSlice = createSlice({
  name: inactAgentName,
  initialState: spotInitialState,
  reducers: {},
  extraReducers: createThunkReducers(fetchInactAgent),
});

export const actions = {
  fetchInactAgent,
};

export default inactAgentSlice;
