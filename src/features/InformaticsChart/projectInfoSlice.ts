import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "api/api";
import { FetchTime } from "api/FetchTime";
import { awiatAnotherFetchDone } from "common/utils/awaitAnoterFecthDone";
import { setLastFetchTime } from "common/utils/setLastFetchTime";
import { sleep } from "common/utils/sleep";
import { SpotInnerState, SpotResponse } from "../type";

export interface ProjectInfoState {
  cpuCore: SpotInnerState;
  host: SpotInnerState;
  inactAgent: SpotInnerState;
  rtime: SpotInnerState;
}

const singleInitialValue = { value: null, lastTime: Date.now(), error: false };

export const initialState: ProjectInfoState = {
  cpuCore: { ...singleInitialValue },
  host: { ...singleInitialValue },
  inactAgent: { ...singleInitialValue },
  rtime: { ...singleInitialValue },
};

type Apis = "cpucore" | "host" | "inact_agent" | "rtime";

const apisMapping: [Apis, keyof ProjectInfoState][] = [
  ["cpucore", "cpuCore"],
  ["host", "host"],
  ["inact_agent", "inactAgent"],
  ["rtime", "rtime"],
];

const projectInfoName = "projectInfo";

const fetchProjectInfo = createAsyncThunk(
  `${projectInfoName}/fetchProjectInfo`,
  async () => {
    const payload = await Promise.allSettled(
      apisMapping.map(([key]) => {
        return api.spot(key);
      })
    );
    return payload;
  }
);

const projectInfoSlice = createSlice({
  name: projectInfoName,
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [fetchProjectInfo.pending.type]: (state: ProjectInfoState) => {},
    [fetchProjectInfo.fulfilled.type]: (
      state: ProjectInfoState,
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
    [fetchProjectInfo.rejected.type]: (
      state: ProjectInfoState,
      { payload }: PayloadAction<SpotResponse[]>
    ) => {
      console.log("projectInfoFetch Error");
      console.log(payload);
    },
  },
});

export const actions = {
  fetchProjectInfo,
};

export default projectInfoSlice;
