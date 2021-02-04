const DEMO_PROJECT_API_TOCKEN = "XGJHUSQZTI2AVIENWA27HI5V";
const DEMO_PROJECT_CODE = "5490";
const OPEN_API_HEADERS = {
  "x-whatap-pcode": DEMO_PROJECT_CODE,
  "x-whatap-token": DEMO_PROJECT_API_TOCKEN,
};

const OPEN_API_ROOT = "https://service.whatap.io/open/api";

interface OPEN_API_IFC {
  "": Record<string, string>;
  json: Record<string, string>;
}

const OPEN_API: OPEN_API_IFC = {
  "": {
    act_agent: "활성화 상태의 에이전트 수",
    inact_agent: "비활성화 상태의 에이전트 수",
    host: "호스트 수",
    cpucore: "호스트의 CPU 코어 합",
    txcount: "트랜잭션 수",
    tps: "초당 트랜잭션 수",
    user: "5분간 집계된 고유 사용자 수",
    actx: "액티브 트랜잭션 수",
    rtime: "평균 응답 시간",
    cpu: "CPU 사용률",
    threadpool_active: "쓰레드풀 활성 쓰레드 수",
    threadpool_queue: "쓰레드풀 큐잉 쓰레드 수",
    dbc_count: "전체 DB Connection 수",
    dbc_active: "활성(Active) DB Connection 수",
    dbc_idle: "비활성(Idle) DB Connection 수",
    act_method: "액티브 Method 수",
    act_sql: "액티브 SQL 수",
    act_httpc: "액티브 HTTP Call 수",
    act_dbc: "액티브 DB Connection 수",
    act_socket: "액티브 Socket 수",
  },
  json: {
    "exception/{stime}/{etime}": "Exception 발생",
    "thread_count/{stime}/{etime}": "Thread 수",
    "visitor_5m/{stime}/{etime}": "액티브 사용자(5m)",
  },
};

const getPath = (url: string, param: Record<string, any> = {}) => {
  let path = url;
  for (let key in param) {
    path = path.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
  }
  return path;
};

const throttled: Record<string, boolean> = {};

const getOpenApi = (type: keyof typeof OPEN_API) => async (
  key: keyof typeof OPEN_API[typeof type],
  param?: Record<string, any>
) => {
  try {
    if (!(key in OPEN_API[type]))
      return {
        error: true,
        key,
        lastTime: Date.now(),
        message: "잘못된 API 정보",
      };

    if (throttled[key])
      return {
        error: true,
        key,
        lastTime: Date.now(),
        message: "Trottle 대기 중",
      };

    throttled[key] = true;

    const url = [OPEN_API_ROOT, type, key]
      .filter((el) => el.length > 0)
      .join("/");
    const name = OPEN_API[type][key];

    const response = await fetch(getPath(url, param), {
      headers: OPEN_API_HEADERS,
    });

    if (response.status >= 300 && response.status < 600) {
      return {
        error: true,
        key,
        statusCode: response.status,
        lastTime: Date.now(),
      };
    }

    const data = await response.json();
    return { error: false, key, name, data, lastTime: Date.now() };
  } catch (error) {
    console.log("핸들링되지 않은 에러");
    console.log(error);
  } finally {
    setTimeout(() => {
      throttled[key] = false;
    }, 3000);
  }
};

const spot = getOpenApi("");
const series = getOpenApi("json");
const api = { spot, series };

export default api;
