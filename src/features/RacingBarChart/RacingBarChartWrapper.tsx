import React, { useEffect } from "react";
import { RootState } from "app/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import BorderConatiner from "components/BorderContainer.style";
import ChartTitle from "components/ChartTitle.styled";
import RacingBarChart from "./RacingBarChart";
import { ActiveStatusState, actions } from "./AtiveStatusSlice";
import ChartContainer from "components/ChartContainer";
import ChartErrorWrapper from "components/ChartErrorWrapper";
import ServerErrorFooter from "components/ErrorFooter";
import useCheckResponseStatus from "common/hooks/useCheckResponseStatus";

const RacingBarChartWrapper: React.FC = () => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(actions.fetchActiveStatus());
    const intervalId = setInterval(() => {
      dispatch(actions.fetchActiveStatus());
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

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
