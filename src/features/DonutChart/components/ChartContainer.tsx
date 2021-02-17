import styled, { css } from "styled-components";

export default styled.div`
  ${({ theme, id }) => {
    return css`
      margin-bottom: 2.5rem;
      svg {
        width: 100%;
        height: 100%;
        overflow: visible;
      }
    `;
  }}
`;
