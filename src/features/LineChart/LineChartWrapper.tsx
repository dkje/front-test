import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import ChartTitle from "components/ChartTitle.styled";
import LineChart from "./LineChart";
import BorderConatiner from "components/BorderContainer.style";
import ChartContainer from "components/ChartContainer";
import ErrorFooter from "components/ErrorFooter";
import useCheckResponseStatus from "common/hooks/useCheckResponseStatus";
import ChartErrorWrapper from "components/ChartErrorWrapper";
import DataInfoList from "components/DataInfoList";
import useGetData from "./hook/useGetData";

const LineChartWrapper = () => {
  const activeVisitor = useSelector((state: RootState) => {
    return state.activeVisitors5m;
  });

  const { isServerError, isRequestError } = useCheckResponseStatus([
    activeVisitor,
  ]);
  useGetData();

  const lineTypeData = [
    { color: "#236fd3", name: "Today" },
    { color: "#4b4b4b", name: "Yesterday" },
  ];

  return (
    <BorderConatiner>
      <ChartContainer>
        <ChartTitle>접속자 현황</ChartTitle>
        <ChartErrorWrapper>
          {!!activeVisitor.value?.today.length && (
            <LineChart
              data={activeVisitor.value}
              id="active_visitor_line_chart"
            />
          )}
          <DataInfoList data={lineTypeData} />
          {isServerError && <ErrorFooter type={"ServerError"} />}
          {isRequestError && <ErrorFooter type={"RequestError"} />}
        </ChartErrorWrapper>
      </ChartContainer>
    </BorderConatiner>
  );
};

export default LineChartWrapper;
