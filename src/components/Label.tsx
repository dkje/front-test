import React from "react";
import styled, { css } from "styled-components";

interface ContainerProps {
  align: "left" | "right";
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
}

const Container = styled.div<ContainerProps>`
  ${({ align, top, bottom, right, left }) => {
    return css`
      position: absolute;
      font-size: 1.3rem;
      text-align: ${align};
      ${top !== undefined
        ? css`
            top: ${top}rem;
          `
        : ""}
      ${bottom !== undefined
        ? css`
            bottom: ${bottom}rem;
          `
        : ""}
      ${left !== undefined
        ? css`
            left: ${left}rem;
          `
        : ""}
      ${right !== undefined
        ? css`
            right: ${right}rem;
          `
        : ""}
    `;
  }}
`;

const Title = styled.p`
  ${() => {
    return css`
      font-weight: bold;
    `;
  }}
`;

const Content = styled.p`
  ${() => {
    return css`
      margin-bottom: 1rem;
    `;
  }}
`;

interface LabelProps {
  data: { title: string; content: string }[];
  align?: "left" | "right";
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
}

const Label: React.FC<LabelProps> = ({ data, align = "left", ...position }) => {
  return (
    <>
      <Container
        align={align}
        top={position.top}
        bottom={position.bottom}
        left={position.left}
        right={position.right}
      >
        {data.map(({ title, content }) => (
          <div key={title}>
            <Title>{title}</Title>
            <Content>{content}</Content>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Label;
