import styled, { css } from "styled-components";

export default styled.p`
  ${({ theme }) => {
    return css`
      font-weight: ${theme.fontWeight.bold};
      font-size: ${theme.fontSize.base};
      margin: 0;
    `;
  }}
`;
