import api from "api/api";

type Unpack<T> = T extends Promise<infer U> ? U : T;
export interface SpotResponse {
  status: "fulfilled" | "rejected";
  value?: Unpack<ReturnType<typeof api.spot>>;
  reason?: Error;
}

export interface SpotInnerState {
  value: number | null;
  error: boolean;
  lastTime: number;
  statusCode?: number;
}

export type SpotInnerStateOrNull = SpotInnerState;
