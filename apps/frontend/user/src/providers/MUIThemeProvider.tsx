import GlobalStyles from '@mui/material/GlobalStyles';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import MUITheme from '@pawhaven/design-system/MUI-theme';

const MUIThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // const muiTheme = useMemo(() => {
  //   return getMUITheme();
  // }, []);

  // if (!muiTheme) return null;
  return (
    <StyledEngineProvider>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={MUITheme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};
export default MUIThemeProvider;
