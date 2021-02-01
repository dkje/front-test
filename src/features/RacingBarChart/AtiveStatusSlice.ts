import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "api/api";
import { SpotResponse } from "../type";

export interface ResponseState {
  activeMethod: null | number;
  activeSQL: null | number;
  activeHttpCall: null | number;
  activeDBConnection: null | number;
  activeSocket: null | number;
}

interface ActiveStatusState {
  loading: boolean;
  data: ResponseState;
}

export const initialState: ActiveStatusState = {
  loading: false,
  data: {
    activeMethod: null,
    activeSQL: null,
    activeHttpCall: null,
    activeDBConnection: null,
    activeSocket: null,
  },
};

type Apis = "act_method" | "act_sql" | "act_httpc" | "act_dbc" | "act_socket";

const apisMapping: [Apis, keyof ResponseState][] = [
  ["act_method", "activeMethod"],
  ["act_sql", "activeSQL"],
  ["act_httpc", "activeHttpCall"],
  ["act_dbc", "activeDBConnection"],
  ["act_socket", "activeSocket"],
];

const activeStatusName = "activeStatusInfo";

const fetchActiveStatus = createAsyncThunk(
  `${activeStatusName}/fetchActiveStatus`,
  async () => {
    const payload = await Promise.allSettled(
      apisMapping.map(([key]) => {
        return api.spot(key);
      })
    );
    return payload;
  }
);

const activeStatusSlice = createSlice({
  name: activeStatusName,
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchActiveStatus.pending.type]: (state: ActiveStatusState) => {
      state.loading = true;
    },
    [fetchActiveStatus.fulfilled.type]: (
      state: ActiveStatusState,
      { payload }: PayloadAction<SpotResponse<Apis>[]>
    ) => {
      for (let response of payload) {
        if (!response.value) continue;
        const stateType = apisMapping.find(
          ([key]) => key === response.value?.key
        );
        if (stateType) state.data[stateType[1]] = response.value.data;
      }
      state.loading = false;
    },
    [fetchActiveStatus.rejected.type]: (
      state: ActiveStatusState,
      { payload }: PayloadAction<SpotResponse<Apis>[]>
    ) => {
      console.log("projectInfoFetch Error");
      console.log(payload);
      state.loading = false;
    },
  },
});

export const actions = {
  fetchActiveStatus,
};

export default activeStatusSlice;
