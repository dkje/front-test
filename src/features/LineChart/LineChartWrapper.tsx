import React, { useEffect, useRef } from "react";
import { actions } from "./ActiveVisitors5mSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/rootReducer";
import moment from "moment";
import ChartTitle from "components/ChartTitle.styled";
import LineChart from "./LineChart";
import BorderConatiner from "components/BorderContainer.style";
import ChartContainer from "components/CharContainer";
import ErrorFooter from "components/ErrorFooter";
import useCheckResponseStatus from "common/hooks/useCheckResponseStatus";

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
    dispatch(
      actions.fetchActiveVisitors({
        stime: moment().subtract(1, "days").startOf("day").unix() * 1000,
        etime: Date.now(),
      })
    );
    // const intervalId = setInterval(fetchData, 5000);

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, []);

  function fetchData() {
    const now = Date.now();
    // state에 데이터가 하나도 없다면(fetch가 실패한 경우)
    // 또는 하루가 지났다면
    // 어제 ~ 지금의 데이터를 가져온다
    if (!activeVisitor.value?.etime || now > nextDay.current) {
      nextDay.current = moment().add(1, "days").startOf("day").unix() * 1000;
      return dispatch(
        actions.fetchActiveVisitors({
          stime: moment().subtract(1, "days").startOf("day").unix() * 1000,
          etime: now,
        })
      );
    }

    // 3. 5초 간격으로 재패치할때마다 그래프에 추가할 데이터를 가져온다
    dispatch(
      actions.fetchActiveVisitors({
        stime: activeVisitor.value.etime,
        etime: now,
      })
    );
  }

  return (
    <BorderConatiner>
      <ChartContainer>
        <ChartTitle>HTTP 외부 호출</ChartTitle>
        <LineChart
          data={{
            today: activeVisitor.value!.today,
            yesterday: activeVisitor.value!.yesterday,
          }}
          id="active_visitor_line_chart"
        />
        {isServerError && <ErrorFooter type={"ServerError"} />}
        {isRequestError && <ErrorFooter type={"RequestError"} />}
      </ChartContainer>
    </BorderConatiner>
  );
};

export default LineChartWrapper;
