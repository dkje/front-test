import { DefaultTheme } from "styled-components";

export const margins = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

export const paddings = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

export const fontSize = {
  sm: "0.7rem",
  base: "1rem",
  lg: "1.6rem",
  xl: "2rem",
  title: "3rem",
};

export const fontFamily = {
  base: `'Noto Sans KR', sans-serif`,
  title: `'Merriweather', serif`,
};

export const fontWeight = {
  light: 100,
  normal: 300,
  bold: 700,
};

export const colors = {
  blue: "#2179ee",
  green: "#00cc9a",
  coral: "#ff6759",
  gold: "#f0b95b",
  purple: "#7537ef",
  white: "#ffffff",
  black: "#000000",
  grey10: "#f3f4f8",
  grey20: "#e1e5eb",
  grey30: "#c2c6cc",
  grey40: "#9ea2a8",
  grey50: "#686c73",
  grey60: "#30363d",
};

const size = {
  mobile: "425px",
  tablet: "768px",
  desktop: "1440px",
};

export const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktopL: `@media only screen and (max-width: ${size.desktop})`,
};

const theme: DefaultTheme = {
  margins,
  paddings,
  fontSize,
  fontFamily,
  fontWeight,
  colors,
  device,
};

export default theme;
