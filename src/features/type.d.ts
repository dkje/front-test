export interface SpotData<T> {
  key: keyof T;
  name: string;
  data: number;
}

export interface SpotResponse<T> {
  status: "fulfilled" | "rejected";
  value?: SpotData<T>;
  reason?: Error;
}

// export interface MultiSpotResponse<T> {
//   loading: boolean;
//   responses: {
//     error: null | string;
//     data: SpotData<T>;
//   }[];
// }
