import moment from "moment";
import { RootState } from "app/rootReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../ExecptionSlice";

const useGetData = () => {
  const exceptions = useSelector((state: RootState) => state.exceptionSerise);
  const dispatch = useDispatch();

  const fetchData = () => {
    const stime =
      exceptions.lastTime ||
      moment().subtract(1, "days").startOf("day").unix() * 1000;
    dispatch(
      actions.fetchExceptionSerise({
        stime,
        etime: Date.now(),
      })
    );
  };

  useEffect(() => {
    fetchData();
    const intervalId = setTimeout(fetchData, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [exceptions]);
};

export default useGetData;
