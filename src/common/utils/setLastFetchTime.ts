import { FetchTime } from "api/FetchTime";

export const setLastFetchTime = () => {
  const fetchTime = FetchTime.buildFetchTime(200);
  fetchTime.setLastFetch();
};
