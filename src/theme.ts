"use client";

import {
  createTheme,
  MantineColorsTuple,
  MantineTheme,
  ConvertCSSVariablesInput,
  CssVariable,
} from "@mantine/core";
import { Exo_2, League_Spartan, Noto_Sans } from "next/font/google";

const exo_2 = Exo_2({ subsets: ["latin"], variable: "--font-exo2" });
const league_spartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
});
const noto_sans = Noto_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

const ruffleOrange: MantineColorsTuple = [
  "#fff6e0",
  "#ffeccb",
  "#ffdc00",
  "#ffc163",
  "#ffad33", // this is ruffle orange
  "#ffa218",
  "#ff9c04",
  "#e48800",
  "#cb7700",
  "#b06600",
];

const ruffleBlue: MantineColorsTuple = [
  "#edf3ff",
  "#dde4f2",
  "#b9c5e0",
  "#92a5cf",
  "#728ac1",
  "#5d79b9",
  "#5271b6",
  "#425fa1",
  "#37528c", // this is ruffle blue
  "#2c4980",
];

const customColors = {
  "ruffle-orange": 4,
  "ruffle-blue": 8,
};

export function cssResolver(theme: MantineTheme): ConvertCSSVariablesInput {
  const variables: Record<CssVariable, string> = {
    "--mantine-color-body": "var(--ruffle-blue)",
    "--mantine-color-text": "var(--ruffle-orange)",
    "--font-primary-heading": league_spartan.style.fontFamily,
  };

  for (const [name, primary] of Object.entries(customColors)) {
    const colors = theme.colors[name];
    variables[`--${name}`] = colors[primary];
    for (let i = 0; i < 10; i++) {
      variables[`--${name}-${i}`] = colors[i];
    }
  }

  return {
    variables,
    dark: variables,
    light: variables,
  };
}

export const theme = createTheme({
  primaryColor: "ruffle-orange",
  colors: { "ruffle-orange": ruffleOrange, "ruffle-blue": ruffleBlue },
  primaryShade: 4,
  fontFamily: noto_sans.style.fontFamily,
  headings: {
    fontFamily: exo_2.style.fontFamily,
  },
});
