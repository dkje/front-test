import { useEffect, useState } from "react";

import api from "../api/api";
import InformaticsChart from "../features/InformaticsChart/InformaticsChart";
const HOUR = 1000 * 60 * 60;
function App() {
  const [actAgent, setActAgent] = useState<any>();
  const [httpcSeries, setHttpcSeries] = useState<any>();

  useEffect(() => {
    api.spot("inact_agent").then((result) => setActAgent(result));
    api
      .series("exception/{stime}/{etime}", {
        stime: Date.now() - HOUR,
        etime: Date.now(),
      })
      .then((result) => setHttpcSeries(result));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <InformaticsChart />
      <h2>프로젝트 API 예시</h2>
      <h3>Spot 정보 조회 URL</h3>
      <pre>{JSON.stringify(actAgent, null, 4)}</pre>
      <hr />
      <h3>통계 정보 조회 URL</h3>
      <pre>{JSON.stringify(httpcSeries, null, 4)}</pre>
    </div>
  );
}

export default App;
