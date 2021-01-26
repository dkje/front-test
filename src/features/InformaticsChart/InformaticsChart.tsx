import React, { useEffect } from "react";
import { ListItem } from "baseui/list";
import ListItemLabel from "../../components/ListItem.style";
import { useDispatch, useSelector } from "react-redux";
import { actions as inactAgentActions } from "./inactAgentSlice";
import { actions as hostActions } from "./hostSlice";
import { actions as cpuCoreActions } from "./cpuCoreSlice";
import { actions as rtimeActions } from "./rtimeSlice";
import { RootState } from "../../app/rootReducer";

const InformaticsChart: React.FC = () => {
  const dispatch = useDispatch();
  const { inactAgent, host, cpuCore, rtime } = useSelector(
    (state: RootState) => state
  );

  const dispatchFetchActions = () => {
    dispatch(inactAgentActions.fetchInactAgent());
    dispatch(hostActions.fetchHost());
    dispatch(cpuCoreActions.fetchCpuCore());
    dispatch(rtimeActions.fetchRtime());
  };

  useEffect(() => {
    dispatchFetchActions();
    const intervalId = setInterval(() => {
      dispatchFetchActions();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {[inactAgent, host, cpuCore, rtime].map((response, i) => {
        return (
          <ListItem>
            <ListItemLabel key={i} description={response.data?.data}>
              {response.data?.name}
            </ListItemLabel>
          </ListItem>
        );
      })}
    </>
  );
};

export default InformaticsChart;
