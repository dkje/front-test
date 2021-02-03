import React, { useEffect } from "react";
import { List, ListItem, ListItemDesc } from "components/List.style";
import { useDispatch, useSelector } from "react-redux";
import { actions, ProjectInfoState } from "./projectInfoSlice";
import { RootState } from "app/rootReducer";
import BorderConatiner from "components/BorderContainer.style";

const InformaticsChart: React.FC = () => {
  const dispatch = useDispatch();
  const projectInfo = useSelector(({ projectInfo }: RootState) => projectInfo);

  useEffect(() => {
    dispatch(actions.fetchProjectInfo());
    const intervalId = setInterval(() => {
      dispatch(actions.fetchProjectInfo());
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const stateKeyWithTitle: [keyof ProjectInfoState, string][] = [
    ["cpuCore", "CPU 코어"],
    ["host", "HOSTS"],
    ["inactAgent", "비활성 애플리케이션"],
    ["rtime", "레이턴시"],
  ];

  return (
    <BorderConatiner>
      {stateKeyWithTitle.map(([key, title]) => {
        return (
          <List>
            <ListItem key={key}>
              {title}
              <ListItemDesc>
                {projectInfo[key] !== null ? projectInfo[key]?.value : "-"}
              </ListItemDesc>
            </ListItem>
          </List>
        );
      })}
    </BorderConatiner>
  );
};

export default InformaticsChart;
