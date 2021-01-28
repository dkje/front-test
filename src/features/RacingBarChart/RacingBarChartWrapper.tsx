import React, { useEffect } from "react";
import { RootState } from "../../app/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import BorderConatiner from "../../components/BorderContainer.style";
import ChartTitle from "../../components/ChartTitle.styled";
import RacingBarChart from "./RacingBarChart";
import { ResponseState, actions } from "./AtiveStatusSlice";
import ChartContainer from "../../components/CharContainer";

const RacingBarChartWrapper: React.FC = () => {
  const dispatch = useDispatch();

  const activeStatusMapper: [keyof ResponseState, string][] = [
    ["activeDBConnection", "DBC"],
    ["activeHttpCall", "HTTPC"],
    ["activeMethod", "METHOD"],
    ["activeSQL", "SQL"],
    ["activeSocket", "SOCKET"],
  ];

  const activeStatus = useSelector((state: RootState) =>
    activeStatusMapper.map(([stateType, title]) => ({
      value: state.activeStatus.data[stateType],
      title,
    }))
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
        <RacingBarChart activeStatus={activeStatus} />
      </ChartContainer>
    </BorderConatiner>
  );
};

export default RacingBarChartWrapper;
