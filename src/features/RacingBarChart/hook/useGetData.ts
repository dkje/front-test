import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../AtiveStatusSlice";

const useGetData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchActiveStatus());
    const intervalId = setInterval(() => {
      dispatch(actions.fetchActiveStatus());
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);
};

export default useGetData;
