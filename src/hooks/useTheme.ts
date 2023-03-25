import { createTheme, darkScrollbar, type PaletteMode } from '@mui/material';
import { type ThemeOptions } from '@mui/material/styles/createTheme';

const defaultOptions: ThemeOptions = {
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiCssBaseline: {
      styleOverrides: (_themeParam) => ({
        body: darkScrollbar(),
      }),
    },
  },
};
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e1e1e',
      paper: '#2e2e2e',
    },
  },
  ...defaultOptions,
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  ...defaultOptions,
});

export default function useTheme(mode: PaletteMode) {
  if (mode === 'light') {
    return lightTheme;
  }
  return darkTheme;
}
