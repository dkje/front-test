import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import theme from "./styles/theme";
import App from "./app/App";
import store from "./app/store";
import reportWebVitals from "./reportWebVitals";

const engine = new Styletron();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BaseProvider>
      </StyletronProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
