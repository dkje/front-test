import { PayloadAction } from "@reduxjs/toolkit";
import { SpotInitialState, SpotResponse } from "../../features/type";

export const setFetchStateSccuess = (state: SpotInitialState) => {
  state.loading = false;
  state.error = null;
};

export const setDataFetchFails = (state: SpotInitialState) => {
  state.loading = false;
  state.error = null;
};

export const createThunkReducers = (thunk: any) => {
  return {
    [thunk.pending.type]: (state: SpotInitialState) => {
      // fetch 시작 전
      state.loading = true;
    },
    [thunk.fulfilled.type]: (
      state: SpotInitialState,
      { payload }: PayloadAction<SpotResponse>
    ) => {
      //fetch 성공시
      setFetchStateSccuess(state);
      state.data = payload;
    },
    [thunk.rejected.type]: (state: SpotInitialState) => {
      //fatch 실패시
      setDataFetchFails(state);
    },
  };
};
