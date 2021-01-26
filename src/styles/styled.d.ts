import "styled-components";
import * as theme from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    device: { [key in keyof typeof theme.device]: string };
    colors: { [key in keyof typeof theme.colors]: string };
    fontSize: { [key in keyof typeof theme.fontSize]: string };
    fontFamily: { [key in keyof typeof theme.fontFamily]: string };
    fontWeight: { [key in keyof typeof theme.fontWeight]: number };
    paddings: { [key in keyof typeof theme.paddings]: string };
    margins: { [key in keyof typeof theme.margins]: string };
  }
}
