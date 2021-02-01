import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "api/api";
import { SpotData, SpotResponse } from "features/type";

// export const createThunkReducers = (thunk: any) => {
//   return {
//     [thunk.pending.type]: (state: SpotResponseState) => {
//       // fetch 시작 전
//       state.loading = true;
//     },
//     [thunk.fulfilled.type]: (
//       state: SpotResponseState,
//       { payload }: PayloadAction<SpotResponse>
//     ) => {
//       //fetch 성공시
//       setFetchStateSccuess(state);
//       state.data = payload;
//     },
//     [thunk.rejected.type]: (state: SpotResponseState) => {
//       //fatch 실패시
//       setDataFetchFails(state);
//     },
//   };
// };

export const createSpotThunkWithThrottle = ({
  reducerName,
  urlKey,
  actionName,
}: {
  reducerName: string;
  urlKey: string;
  actionName: string;
}) => {
  let canFetch = true;
  return createAsyncThunk(`${reducerName}/${actionName}`, async () => {
    if (!canFetch) throw Error("너무 잦은 fetch");
    canFetch = false;
    const payload = await api.spot(urlKey);
    setTimeout(() => {
      canFetch = true;
    }, 2000);
    return payload;
  });
};
