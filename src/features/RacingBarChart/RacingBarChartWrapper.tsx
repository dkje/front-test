import React, { useEffect } from "react";
import { RootState } from "../../app/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import BorderConatiner from "../../components/BorderContainer.style";
import ChartTitle from "../../components/ChartTitle.styled";
import RacingBarChart from "./RacingBarChart";

const RacingBarChartWrapper: React.FC = () => {
  const dispatch = useDispatch();

  // const activeStatus = useSelector((state: RootState) =>
  //   activeStatusMapper.map(([title, stateType]) => {
  //   })
  // );

  const dispatchFetchRequest = () => {};

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
      {/* <RacingBarChart activeStatus={activeStatus} /> */}
    </BorderConatiner>
  );
};

export default RacingBarChartWrapper;
