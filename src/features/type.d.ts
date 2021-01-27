export interface SpotResponse {
  key: string;
  name: string;
  data: string;
}

export interface SpotResponseState {
  loading: boolean;
  error: null | string;
  data: null | SpotResponse;
}
