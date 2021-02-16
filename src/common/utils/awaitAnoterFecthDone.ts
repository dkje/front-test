import { FetchTime } from "api/FetchTime";
import { sleep } from "./sleep";

export const awiatAnotherFetchDone = async () => {
  const fetchTime = FetchTime.buildFetchTime(150);
  fetchTime.setFetcingNow();
  while (!fetchTime.getIntervalDone()) {
    await sleep(fetchTime.interval);
    fetchTime.setFetcingDone();
  }
};
