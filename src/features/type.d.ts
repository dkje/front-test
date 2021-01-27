export interface SpotResponse {
  key: string;
  name: string;
  data: string;
}

export interface SpotInitialState {
  loading: boolean;
  error: null | string;
  data: null | SpotResponse;
}
