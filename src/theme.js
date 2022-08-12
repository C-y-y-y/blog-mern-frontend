import { createTheme } from "@mui/material/styles";
import {green} from "@mui/material/colors";

export const theme = createTheme({
  shadows: Array(25).fill('none'),
  palette: {
    primary: {
      light: green[300],
      main: green[500],
      dark: green[700]
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
