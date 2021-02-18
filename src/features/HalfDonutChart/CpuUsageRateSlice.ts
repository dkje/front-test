import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "api/api";
import { SeriseResponse, SeriseState, SpotInnerState } from "features/type";

interface CpuUsageRate {
  cpu: SpotInnerState;
}

export const initialState: SeriseState<CpuUsageRate> = {
  value: {
    cpu: {
      value: null,
      error: false,
      lastTime: 0,
    },
  },
  error: false,
  lastTime: 0,
};

const cpuUsageRateName = "cpuUseageRateSpot";

const fetchCpuSpot = createAsyncThunk(
  `${cpuUsageRateName}/fetchCpuSpot`,
  async () => {
    const payload = await api.spot("cpu");
    return payload;
  }
);

const threadCountAvgSlice = createSlice({
  name: cpuUsageRateName,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCpuSpot.fulfilled.type]: (
      state: SeriseState<CpuUsageRate>,
      { payload }: PayloadAction<SeriseResponse>
    ) => {
      if (!payload) return;

      if (payload.error || !payload.data) {
        state.error = true;
        state.statusCode = payload.statusCode;
        return;
      }

      state.lastTime = payload.lastTime;
      state.value!.cpu.value = payload.data;
    },
  },
});

export const actions = {
  fetchCpuSpot,
};

export default threadCountAvgSlice;
