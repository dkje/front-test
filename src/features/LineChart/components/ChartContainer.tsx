import styled, { css } from "styled-components";

export default styled.div`
  ${({ theme, id }) => {
    return css`
      svg {
        width: 100%;
        height: 100%;
        overflow: visible;

        .today_area {
          fill: #82a7d8;
          fill-opacity: 0.5;
          stroke-width: 0;
        }

        .yesterday_area {
          fill: #9e9e9e;
          fill-opacity: 0.2;
          stroke-width: 0;
        }

        .${id}_today {
          stroke: #236fd3;
          fill: none;
        }

        .${id}_yesterday {
          stroke: #4b4b4b;
          fill: none;
        }
      }
    `;
  }}
`;
