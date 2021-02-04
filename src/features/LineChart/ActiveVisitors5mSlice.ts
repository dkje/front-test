import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "api/api";
import { SeriseResponse, SeriseState } from "features/type";
import moment from "moment";

interface ActiveVisitors5mState {
  today: [number, number][];
  yesterday: [number, number][];
  pcode: number;
  stime: number;
  etime: number;
  total: number;
}

export const initialState: SeriseState<ActiveVisitors5mState> = {
  value: { today: [], yesterday: [], pcode: 0, stime: 0, etime: 0, total: 0 },
  error: false,
  lastTime: 0,
};

const activeVisitors5mName = "activeVisitors5m";

const fetchActiveVisitors = createAsyncThunk(
  `${activeVisitors5mName}/fetchActiveVisitors5m`,
  async ({ stime, etime }: { stime: number; etime: number }) => {
    const payload = await api.series("visitor_5m/{stime}/{etime}", {
      stime,
      etime,
    });
    return payload;
  }
);

const activeVisitorsSlice = createSlice({
  name: activeVisitors5mName,
  initialState,
  reducers: {},
  extraReducers: {
    [fetchActiveVisitors.fulfilled.type]: (
      state: SeriseState<ActiveVisitors5mState>,
      { payload }: PayloadAction<SeriseResponse>
    ) => {
      if (!payload) return;

      state.lastTime = Date.now();

      if (payload.error || !payload.data) {
        state.error = true;
        state.statusCode = payload.statusCode;
        return;
      }

      state.error = false;
      state.statusCode = undefined;
      state.value!.etime = payload.data.etime;
      // 오류가 없었다면
      // 1. 이틀치의 데이터인지 확인한다
      const DAY = 86400000; /* 1000 * 60 * 60 * 24 */
      const isTwoDaysData = payload.data.etime - payload.data.stime > DAY;

      if (isTwoDaysData) {
        // yesterday와 today 모두 업데이트한다
        state.value!.yesterday = payload.data.data.slice(0, 8545);
        state.value!.today = payload.data.data.slice(8546);
        state.value!.stime = payload.data.stime;
        state.value!.total = payload.data.total;
        return;
      }

      // false:
      // etime과 total를 가져온 데이터만큼 추가한다
      state.value!.today = [...state.value!.today, ...payload.data.data];
      state.value!.total += payload.data.total;
    },
  },
});

export const actions = {
  fetchActiveVisitors,
};

export default activeVisitorsSlice;
