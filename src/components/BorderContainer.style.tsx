import styled, { css } from "styled-components";

const BorderConatiner = styled.div`
  ${({ theme }) => {
    return css`
      border: 1px solid rgba(0, 0, 0, 0.2);
      background-color: ${theme.colors.grey10};
      padding: 1rem;
      border-radius: 4px;
    `;
  }}
`;

export default BorderConatiner;
