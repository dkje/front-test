import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../api/api";
import { SpotResponse } from "../type";

export interface ResponseState {
  cpuCore: null | number;
  host: null | number;
  inactAgent: null | number;
  rtime: null | number;
}

interface ProjectInfoState {
  loading: boolean;
  data: ResponseState;
}

export const initialState: ProjectInfoState = {
  loading: false,
  data: {
    cpuCore: null,
    host: null,
    inactAgent: null,
    rtime: null,
  },
};

type Apis = "cpucore" | "host" | "inact_agent" | "rtime";

const apisMapping: [Apis, keyof ResponseState][] = [
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
    [fetchProjectInfo.pending.type]: (state: ProjectInfoState) => {
      state.loading = true;
    },
    [fetchProjectInfo.fulfilled.type]: (
      state: ProjectInfoState,
      { payload }: PayloadAction<SpotResponse<ResponseState>[]>
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
    [fetchProjectInfo.rejected.type]: (
      state: ProjectInfoState,
      { payload }: PayloadAction<SpotResponse<ResponseState>[]>
    ) => {
      console.log("projectInfoFetch Error");
      console.log(payload);
      state.loading = false;
    },
  },
});

export const actions = {
  fetchProjectInfo,
};

export default projectInfoSlice;
