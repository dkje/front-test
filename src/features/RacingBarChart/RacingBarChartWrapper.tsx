import React, { useEffect } from "react";
import { RootState } from "../../app/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import BorderConatiner from "../../components/BorderContainer.style";
import ChartTitle from "../../components/ChartTitle.styled";
import RacingBarChart from "./RacingBarChart";
import { actions as activeDBAction } from "./ativeDBConnectionSlice";
import { actions as activeHttpCallAction } from "./ativeHttpCallSlice";
import { actions as activeMethodAction } from "./ativeMethodSlice";
import { actions as activeSQLAction } from "./ativeSQLSlice";
import { actions as activeSocketAction } from "./ativeSocketSlice";

const activeStatusMapper: [string, keyof RootState][] = [
  ["DBC", "actDBConnection"],
  ["HTTPC", "actHttpCall"],
  ["METHOD", "actMethod"],
  ["SQL", "actSQL"],
  ["SOCKET", "actSocket"],
];

const RacingBarChartWrapper: React.FC = () => {
  const dispatch = useDispatch();

  const activeStatus = useSelector((state: RootState) =>
    activeStatusMapper.map(([title, stateType]) => {
      return {
        title,
        value: Number(state[stateType]?.data?.data) || 0,
      };
    })
  );

  const dispatchFetchRequest = () => {
    dispatch(activeDBAction.fetchActiveHttpCall());
    dispatch(activeHttpCallAction.fetchActiveHttpCall());
    dispatch(activeMethodAction.fetchActiveMethod());
    dispatch(activeSQLAction.fetchActiveSQL());
    dispatch(activeSocketAction.fetchActiveSocket());
  };

  useEffect(() => {
    dispatchFetchRequest();
    const intervalId = setInterval(() => {
      dispatchFetchRequest();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <BorderConatiner>
      <ChartTitle>액티브 스테이터스</ChartTitle>
      <RacingBarChart activeStatus={activeStatus} />
    </BorderConatiner>
  );
};

export default RacingBarChartWrapper;
