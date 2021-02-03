import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "api/api";
import { SpotInnerStateOrNull, SpotResponse } from "../type";

export interface ActiveStatusState {
  activeMethod: SpotInnerStateOrNull;
  activeSQL: SpotInnerStateOrNull;
  activeHttpCall: SpotInnerStateOrNull;
  activeDBConnection: SpotInnerStateOrNull;
  activeSocket: SpotInnerStateOrNull;
}

const singleInitialValue = { value: null, lastTime: Date.now(), error: false };

export const initialState: ActiveStatusState = {
  activeMethod: { ...singleInitialValue },
  activeSQL: { ...singleInitialValue },
  activeHttpCall: { ...singleInitialValue },
  activeDBConnection: { ...singleInitialValue },
  activeSocket: { ...singleInitialValue },
};

type Apis = "act_method" | "act_sql" | "act_httpc" | "act_dbc" | "act_socket";

const apisMapping: [Apis, keyof ActiveStatusState][] = [
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
    // [fetchActiveStatus.pending.type]: (state: ActiveStatusState) => {},
    [fetchActiveStatus.fulfilled.type]: (
      state: ActiveStatusState,
      { payload }: PayloadAction<SpotResponse[]>
    ) => {
      for (let response of payload) {
        const stateType = apisMapping.find(
          ([key]) => key === response.value?.key
        );

        if (!stateType || !response.value) continue;
        const stateOfResponse = state[stateType[1]];
        if (!stateOfResponse) continue;

        if (response.value.error) {
          stateOfResponse.error = true;
          stateOfResponse.statusCode = response.value.statusCode;
        } else {
          stateOfResponse.error = false;
          stateOfResponse.value = response.value.data;
          stateOfResponse.statusCode = undefined;
        }

        stateOfResponse.lastTime = response.value.lastTime;
      }
    },
    [fetchActiveStatus.rejected.type]: (
      state: ActiveStatusState,
      { payload }: PayloadAction<SpotResponse[]>
    ) => {
      console.log("projectInfoFetch Error");
      console.log(payload);
    },
  },
});

export const actions = {
  fetchActiveStatus,
};

export default activeStatusSlice;
