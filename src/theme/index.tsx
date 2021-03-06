import {
  CssBaseline,
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core';

const defaultTheme = createMuiTheme({
  shape: {
    borderRadius: 0,
  },
});

interface Props {
  children?: React.ReactNode;
}

function ThemeProvider({ children }: Props) {
  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={defaultTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default ThemeProvider;
