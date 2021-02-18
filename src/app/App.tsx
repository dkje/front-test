import React from "react";
import InformaticsChart from "features/InformaticsChart/InformaticsChart";
import RacingBarChartWrapper from "features/RacingBarChart/RacingBarChartWrapper";
import LineChartWrapper from "features/LineChart/LineChartWrapper";
import DonutBarChartWrapper from "features/DonutChart/DonutChartWrapper";
import HalfDonutChartWrapper from "features/HalfDonutChart/HalfDonutChartWrapper";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <InformaticsChart />
      <RacingBarChartWrapper />
      <LineChartWrapper />
      <DonutBarChartWrapper />
      <HalfDonutChartWrapper />
    </div>
  );
}

export default App;
