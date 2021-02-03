import React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  ${({ theme }) => {
    return css`
      width: 100%;
      padding: 1rem 2rem;
      background-color: ${theme.colors.purple};
      color: ${theme.colors.white};
      text-align: center;
    `;
  }}
`;

type ErrorFooterProp = {
  type: "ServerError" | "RequestError";
};

const ErrorFooter: React.FC<ErrorFooterProp> = ({ type }) => {
  const text =
    type === "ServerError"
      ? "데이터를 불러올 수 없습니다."
      : "올바른 요청이 아닙니다.";

  return <Container>{text} 고객 센터에 문의해주세요.</Container>;
};

export default ErrorFooter;
