import React from "react";
import InformaticsChart from "features/InformaticsChart/InformaticsChart";
import RacingBarChartWrapper from "features/RacingBarChart/RacingBarChartWrapper";
import LineChartWrapper from "features/LineChart/LineChartWrapper";
import StackBarChartWrapper from "features/DounutChart/DonutChartWrapper";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <InformaticsChart />
      <RacingBarChartWrapper />
      <LineChartWrapper />
      <StackBarChartWrapper />
    </div>
  );
}

export default App;
