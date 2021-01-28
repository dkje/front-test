import styled, { css } from "styled-components";

export const List = styled.ul`
  ${({ theme }) => {
    return css`
      width: 100%;
    `;
  }}
`;

export const ListItem = styled.li`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fontSize.sm};
      font-weight: ${theme.fontWeight.bold};
      padding: ${theme.paddings.base};
      padding-bottom: 3rem;
      position: relative;
      border-bottom: 1px solid ${theme.colors.grey30};
      &::nth-last-child() {
        border-bottom: none;
      }
    `;
  }}
`;

export const ListItemDesc = styled.div`
  ${({ theme }) => {
    return css`
      font-size: ${theme.fontSize.lg};
      position: absolute;
      bottom: ${theme.paddings.base};
      right: ${theme.paddings.base};
    `;
  }}
`;
