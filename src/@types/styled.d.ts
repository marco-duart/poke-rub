import { lightTheme } from "../constants/theme";

export type ThemeType = typeof lightTheme;

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      error: string;
    };
    spacing: {
      small: number;
      medium: number;
      large: number;
    };
    fonts: {
      regular: string;
      bold: string;
    };
  }
}
