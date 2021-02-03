import React from "react";
import styled from "styled-components";

const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ErrorContainer = () => {
  return <Box>차트를 렌더링 할 수 없습니다. 화면을 새로고침 해주세요.</Box>;
};

export default ErrorContainer;
