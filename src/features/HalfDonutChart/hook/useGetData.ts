import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../CpuUsageRateSlice";

export const useGetData = () => {
  const dispatch = useDispatch();
  const fetchData = () => {
    dispatch(actions.fetchCpuSpot());
  };
  useEffect(() => {
    fetchData();
    setInterval(fetchData, 5000);
  }, []);
};

export default useGetData;
