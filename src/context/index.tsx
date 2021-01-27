import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from 'theme';

interface Props {
  children?: React.ReactNode;
}

function AppProviders({ children }: Props) {
  return (
    <BrowserRouter>
      <ThemeProvider>{children}</ThemeProvider>
    </BrowserRouter>
  );
}

export default AppProviders;
