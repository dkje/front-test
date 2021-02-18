import React from "react";
import styled, { css } from "styled-components";

const List = styled.ul<{ variable: string; position: string }>`
  ${({ theme, variable, position }) => {
    return css`
      display: flex;
      flex-direction: ${variable};
      justify-content: ${position};
    `;
  }}
`;

const ListItem = styled.li<{ color: string }>`
  ${({ theme, color }) => {
    return css`
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      margin-left: 1rem;
      margin-bottom: 0.5rem;
      div {
        margin-right: 0.5rem;
        width: 1rem;
        height: 1rem;
        background-color: ${color};
      }
    `;
  }}
`;

interface DataInfoListProps {
  data: { color: string; name: string }[];
  variable?: "row" | "column";
  position?: "left" | "right" | "center";
}

const DataInfoList: React.FC<DataInfoListProps> = ({
  data,
  variable = "row",
  position = "left",
}) => {
  return (
    <List variable={variable} position={position}>
      {data.map(({ color, name }) => {
        return (
          <ListItem color={color} key={name}>
            <div className="color_box"></div>
            <p>{name}</p>
          </ListItem>
        );
      })}
    </List>
  );
};

export default DataInfoList;
