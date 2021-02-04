import React from "react";
import InformaticsChart from "features/InformaticsChart/InformaticsChart";
import RacingBarChartWrapper from "features/RacingBarChart/RacingBarChartWrapper";
import LineChartWrapper from "features/LineChart/LineChartWrapper";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <InformaticsChart />
      <RacingBarChartWrapper />
      <LineChartWrapper />
    </div>
  );
}

export default App;
