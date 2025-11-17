import GlobalStyles from '@mui/material/GlobalStyles';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import MUITheme from '../../../../../packages/design-system/MUI-theme';

const MUIThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledEngineProvider>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={MUITheme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
};
export default MUIThemeProvider;
