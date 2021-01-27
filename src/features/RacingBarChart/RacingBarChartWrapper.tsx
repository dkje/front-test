import React, { useEffect } from "react";
import { RootState } from "../../app/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import BorderConatiner from "../../components/BorderContainer.style";
import ChartTitle from "../../components/ChartTitle.styled";
import RacingBarChart from "./RacingBarChart";

const RacingBarChartWrapper: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <BorderConatiner>
      <ChartTitle>액티브 스테이터스</ChartTitle>
      <RacingBarChart data={"todo"} />
    </BorderConatiner>
  );
};

export default RacingBarChartWrapper;
