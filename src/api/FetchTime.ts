import moment from "moment";
import { Moment } from "moment";

export class FetchTime {
  #lastFetch: Moment = moment();
  #isFetching: boolean = false;
  static fetchTime: FetchTime;

  constructor(private intervalMilliSeconds: number) {}

  static buildFetchTime(intervalMilliSeconds: number) {
    if (!this.fetchTime) this.fetchTime = new FetchTime(intervalMilliSeconds);
    return this.fetchTime;
  }

  get interval() {
    return this.intervalMilliSeconds;
  }

  get isFetching() {
    return this.#isFetching;
  }

  setLastFetch() {
    this.#lastFetch = moment();
  }

  setFetcingNow() {
    this.#isFetching = true;
  }

  setFetcingDone() {
    this.#isFetching = false;
  }

  getIntervalDone(): boolean {
    if (this.isFetching) return false;
    return this.#lastFetch
      .clone()
      .add(this.intervalMilliSeconds, "milliseconds")
      .isBefore(moment());
  }
}
