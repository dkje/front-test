import React from "react";
//hook
import useCheckResponseStatus from "common/hooks/useCheckResponseStatus";
import useGetData from "./hook/useGetData";

//components
import ChartContainer from "components/ChartContainer";
import BorderConatiner from "components/BorderContainer.style";
import ChartTitle from "components/ChartTitle.styled";
import ChartErrorWrapper from "components/ChartErrorWrapper";
import ErrorFooter from "components/ErrorFooter";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import HalfDonutChart from "./HalfDonutChart";
import DataInfoList from "components/DataInfoList";

const GuageChartWrapper = () => {
  useGetData();
  const cpuUsageRate = useSelector((state: RootState) => state.cpuUsageRate);
  const { isServerError, isRequestError } = useCheckResponseStatus([
    cpuUsageRate,
  ]);

  const colors = {
    background: "rgb(205,205,205)",
    safe: "rgb(33, 238, 135)",
    main: "rgb(33, 121, 238)",
    warning: "rgb(238, 166, 33)",
    urgent: "rgb(238, 74, 33)",
  };

  const data = () => {
    const map = [];
    for (let key in colors) {
      if (key === "background") continue;
      map.push({ name: key, color: colors[key as keyof typeof colors] });
    }
    return map;
  };

  return (
    <BorderConatiner>
      <ChartContainer>
        <ChartTitle>Cpu Usage Rate</ChartTitle>
        <ChartErrorWrapper>
          <HalfDonutChart
            data={cpuUsageRate.value?.cpu}
            min={0}
            max={20}
            colors={colors}
            id={"cpuUsageGaugeChart"}
          />
          {isServerError && <ErrorFooter type={"ServerError"} />}
          {isRequestError && <ErrorFooter type={"RequestError"} />}
          <DataInfoList data={data()} variable="row" position="center" />
        </ChartErrorWrapper>
      </ChartContainer>
    </BorderConatiner>
  );
};

export default GuageChartWrapper;
