import React from "react";
import { RootState } from "app/rootReducer";
import { useSelector } from "react-redux";
import BorderConatiner from "components/BorderContainer.style";
import ChartTitle from "components/ChartTitle.styled";
import RacingBarChart from "./RacingBarChart";
import { ActiveStatusState } from "./AtiveStatusSlice";
import ChartContainer from "components/ChartContainer";
import ChartErrorWrapper from "components/ChartErrorWrapper";
import ServerErrorFooter from "components/ErrorFooter";
import useCheckResponseStatus from "common/hooks/useCheckResponseStatus";
import useGetData from "./hook/useGetData";

const RacingBarChartWrapper: React.FC = () => {
  const activeStatusMapper: [keyof ActiveStatusState, string][] = [
    ["activeDBConnection", "DBC"],
    ["activeHttpCall", "HTTPC"],
    ["activeMethod", "METHOD"],
    ["activeSQL", "SQL"],
    ["activeSocket", "SOCKET"],
  ];

  const activeStatus = useSelector((state: RootState) =>
    activeStatusMapper.map(([stateType, title]) => ({
      value: state.activeStatus[stateType]?.value ?? 0,
      title,
      statusCode: state.activeStatus[stateType].statusCode,
    }))
  );

  const { isServerError, isRequestError } = useCheckResponseStatus(
    activeStatus
  );

  useGetData();

  return (
    <BorderConatiner>
      <ChartContainer>
        <ChartTitle>액티브 스테이터스</ChartTitle>
        <ChartErrorWrapper>
          <RacingBarChart activeStatus={activeStatus} />
        </ChartErrorWrapper>
        {isServerError && <ServerErrorFooter type={"ServerError"} />}
        {isRequestError && <ServerErrorFooter type={"RequestError"} />}
      </ChartContainer>
    </BorderConatiner>
  );
};

export default RacingBarChartWrapper;
