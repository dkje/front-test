import styled from "styled-components";

export default styled.div`
  svg {
    overflow: visible;
    width: 100%;
    heihgt: 100%;

    .bar,
    .bar_tail {
      cursor: pointer;
      fill-opacity: 0.7;
    }

    .label {
      fill: rgba(0, 0, 0, 0.8);
      font-size: 1.2rem;
    }

    .yAxis {
      stroke: rgba(0, 0, 0, 0.5);
      stroke-width: 0.1;
    }

    .yAxis text {
      font-size: 1.2rem;
    }
  }
`;
