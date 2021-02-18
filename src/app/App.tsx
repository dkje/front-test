import React from "react";
import InformaticsChart from "features/InformaticsChart/InformaticsChart";
import RacingBarChartWrapper from "features/RacingBarChart/RacingBarChartWrapper";
import LineChartWrapper from "features/LineChart/LineChartWrapper";
import DonutBarChartWrapper from "features/DonutChart/DonutChartWrapper";
import HalfDonutChartWrapper from "features/HalfDonutChart/HalfDonutChartWrapper";
import AppContainer from "components/AppContainer.styled";

function App() {
  return (
    <AppContainer>
      <div>
        <InformaticsChart />
        <RacingBarChartWrapper />
        <LineChartWrapper />
      </div>
      <div>
        <DonutBarChartWrapper />
        <HalfDonutChartWrapper />
      </div>
    </AppContainer>
  );
}

export default App;
