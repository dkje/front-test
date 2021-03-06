import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset};

    ${({ theme }) => {
      return css`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html,
        body,
        #root {
          width: 100%;
          height: 100%;
        }

        html {
          font-size: 62.5%; //1rem = 10px;
        }

        body {
          font-family: ${theme.fontFamily.base};
          font-weight: ${theme.fontWeight.normal};
          font-size: ${theme.fontSize.base};
          background-color: ${theme.colors.grey20};
        }
      `;
    }}
`;

export default GlobalStyle;
