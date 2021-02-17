import React, { useEffect, useRef } from "react";
import { actions } from "./ActiveVisitors5mSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import moment from "moment";
import ChartTitle from "components/ChartTitle.styled";
import LineChart from "./LineChart";
import BorderConatiner from "components/BorderContainer.style";
import ChartContainer from "components/ChartContainer";
import ErrorFooter from "components/ErrorFooter";
import useCheckResponseStatus from "common/hooks/useCheckResponseStatus";
import ChartErrorWrapper from "components/ChartErrorWrapper";
import DataInfoList from "components/DataInfoList";

const LineChartWrapper = () => {
  const dispatch = useDispatch();
  const activeVisitor = useSelector((state: RootState) => {
    return state.activeVisitors5m;
  });
  let nextDay = useRef(moment().add(1, "days").startOf("day").unix() * 1000);

  const { isServerError, isRequestError } = useCheckResponseStatus([
    activeVisitor,
  ]);

  useEffect(() => {
    const intervalId = setTimeout(fetchData, 5000);
    return () => {
      clearTimeout(intervalId);
    };
  }, [activeVisitor]);

  useEffect(() => {
    dispatch(
      actions.fetchActiveVisitors({
        stime: moment().subtract(1, "days").startOf("day").unix() * 1000,
        etime: Date.now(),
      })
    );
  }, []);

  function fetchData() {
    const now = Date.now();
    if (!activeVisitor.value?.etime || now > nextDay.current) {
      nextDay.current = moment().add(1, "days").startOf("day").unix() * 1000;
      return dispatch(
        actions.fetchActiveVisitors({
          stime: moment().subtract(1, "days").startOf("day").unix() * 1000,
          etime: now,
        })
      );
    }

    dispatch(
      actions.fetchActiveVisitors({
        stime: activeVisitor.value.etime,
        etime: now,
      })
    );
  }

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
