import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    ochre: Palette["primary"];
    ashblack: Palette["primary"];
    customorange: Palette["primary"];
    customblue: Palette["primary"];
    bfpRed: Palette["primary"];
    bfpGold: Palette["primary"];
    bfpBlue: Palette["primary"];
  }
  interface PaletteOptions {
    ochre?: PaletteOptions["primary"];
    ashblack?: PaletteOptions["primary"];
    customorange?: PaletteOptions["primary"];
    customblue?: PaletteOptions["primary"];
    bfpRed?: PaletteOptions["primary"];
    bfpGold?: PaletteOptions["primary"];
    bfpBlue?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    ochre: true;
    ashblack: true;
    customorange: true;
    customblue: true;
    bfpRed: true;
    bfpGold: true;
    bfpBlue: true;
  }
}

const theme = createTheme({
  palette: {
    ochre: {
      main: "#E3D026",
      light: "#E9DB5D",
      dark: "#A29415",
      contrastText: "#242105",
    },
    ashblack: {
      main: "#252527",
      light: "#3c3c3f",
      dark: "#101011",
      contrastText: "#ffffff",
    },
    customorange: {
      main: "#F18B21",
      light: "#f5a347",
      dark: "#b26518",
      contrastText: "#000",
    },
    customblue: {
      main: "#1E88E5",
      light: "#6AB7FF",
      dark: "#005CB2",
      contrastText: "#fff",
    },
    bfpRed: {
      main: "#B22222",
      light: "#c94242", // slightly lighter red
      dark: "#7c1616", // darker shade
      contrastText: "#ffffff",
    },
    bfpGold: {
      main: "#FFD700",
      light: "#ffe44f", // lighter golden yellow
      dark: "#c5a800", // deeper gold
      contrastText: "#000000",
    },
    bfpBlue: {
      main: "#002868",
      light: "#335599", // lighter blue
      dark: "#001542", // very dark blue
      contrastText: "#ffffff",
    },
  },
});

export default theme;
