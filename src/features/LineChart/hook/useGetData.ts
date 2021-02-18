import { RootState } from "app/rootReducer";
import { actions } from "../ActiveVisitors5mSlice";
import moment from "moment";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetData = () => {
  const dispatch = useDispatch();
  let nextDay = useRef(moment().add(1, "days").startOf("day").unix() * 1000);

  const activeVisitor = useSelector((state: RootState) => {
    return state.activeVisitors5m;
  });

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
};

export default useGetData;
