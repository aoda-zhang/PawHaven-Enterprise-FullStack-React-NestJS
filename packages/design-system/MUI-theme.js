import { createTheme } from '@mui/material/styles';

export function getCssVar(name) {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

const MUITheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: getCssVar('--color-primary'),
      light: getCssVar('--color-primary-light'),
      dark: getCssVar('--color-primary-dark'),
      contrastText: '#ffffff',
    },
    secondary: {
      main: getCssVar('--color-primary'),
      light: getCssVar('--color-primary-light'),
      dark: getCssVar('--color-primary-dark'),
      contrastText: '#ffffff',
    },
    background: {
      default: getCssVar('--color-background'),
      paper: getCssVar('--color-surface'),
    },
    text: {
      primary: getCssVar('--color-text'),
      secondary: getCssVar('--color-text-secondary'),
    },
    divider: getCssVar('--color-border'),
    error: {
      main: getCssVar('--color-error'),
    },
    success: {
      main: getCssVar('--color-success'),
      light: getCssVar('--color-success'),
      dark: getCssVar('--color-success'),
    },
    // warning: {
    //   main: getCssVar('--color-warning'),
    // },
    // info: {
    //   main: getCssVar('--color-accent'),
    // },
  },
  // colorSchemes: {
  //   light: { palette: {} },
  // },
  spacing: getCssVar('--spacing-4'),
});

export default MUITheme;
