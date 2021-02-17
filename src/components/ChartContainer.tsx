import styled, { css } from "styled-components";

const ChartContainer = styled.div`
  ${({ theme }) => {
    return css`
      position: relative;
      padding: ${theme.paddings.lg} ${theme.paddings.base};
    `;
  }}
`;

export default ChartContainer;
