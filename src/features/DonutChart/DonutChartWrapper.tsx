import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
// hooks
import useMapColor, { colors } from "./hooks/useMapColor";
import useGetData from "./hooks/useGetData";
import useCheckResponseStatus from "common/hooks/useCheckResponseStatus";
// components
import BorderConatiner from "components/BorderContainer.style";
import ChartContainer from "components/ChartContainer";
import ChartTitle from "components/ChartTitle.styled";
import ChartErrorWrapper from "components/ChartErrorWrapper";
import DonutChart from "./DonutChart";
import DataInfoList from "components/DataInfoList";
import ErrorFooter from "components/ErrorFooter";
import Label from "components/Label";

const DonutBarChartWrapper: React.FC = () => {
  const exceptions = useSelector((state: RootState) => state.exceptionSerise);
  const { isServerError, isRequestError } = useCheckResponseStatus([
    exceptions,
  ]);
  const lineTypeData = useMapColor();
  useGetData();

  return (
    <BorderConatiner>
      <ChartContainer>
        <ChartTitle>Exceptions</ChartTitle>
        <Label
          align="right"
          top={5}
          right={5}
          data={[{ title: "total", content: String(exceptions.value?.total) }]}
        />
        <ChartErrorWrapper>
          {!!exceptions.value?.records.length && (
            <DonutChart
              data={exceptions.value.records}
              colors={colors}
              id="active_visitor_line_chart"
            />
          )}
          <DataInfoList data={lineTypeData} variable="column" />
          {isServerError && <ErrorFooter type={"ServerError"} />}
          {isRequestError && <ErrorFooter type={"RequestError"} />}
        </ChartErrorWrapper>
      </ChartContainer>
    </BorderConatiner>
  );
};

export default DonutBarChartWrapper;
