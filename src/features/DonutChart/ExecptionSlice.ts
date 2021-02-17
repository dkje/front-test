import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "api/api";
import { SeriseResponse, SeriseState } from "features/type";

interface SeriseRecord {
  oids?: string;
  time?: number;
  classHash?: number;
  count?: number;
  service?: string;
  class?: string;
  serviceHash?: number;
  snapSeq?: string;
  msg?: string;
}

interface ExceptionSeriseState {
  total: number;
  records: { key: string; value: SeriseRecord[] }[];
}

export const initialState: SeriseState<ExceptionSeriseState> = {
  value: { total: 0, records: [] },
  error: false,
  lastTime: 0,
};

const exceoptionName = "exceptionSerise";

const fetchExceptionSerise = createAsyncThunk(
  `${exceoptionName}/fetchExceptionSerise`,
  async (time: { stime: number; etime: number }) => {
    const payload = await api.series("exception/{stime}/{etime}", time);
    return payload;
  }
);

const exceptionSlice = createSlice({
  name: exceoptionName,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchExceptionSerise.fulfilled.type]: (
      state: SeriseState<ExceptionSeriseState>,
      { payload }: PayloadAction<SeriseResponse>
    ) => {
      if (!payload) return;

      if (payload.error || !payload.data) {
        state.error = true;
        state.statusCode = payload.statusCode;
        return;
      }

      if (!!payload.data.length) return;

      state.lastTime = payload.lastTime;

      for (let data of payload.data.records) {
        const key = data.msg;
        const i = state.value?.records.findIndex((el) => el.key === key);
        if (i && i >= 0) {
          state.value?.records[i].value.push(data);
        } else {
          state.value?.records.push({ key, value: [data] });
        }
      }

      state.value?.records.sort((a, b) => b.value.length - a.value.length);
      state.value!.total += payload.data.total;
    },
  },
});

export const actions = {
  fetchExceptionSerise,
};

export default exceptionSlice;
