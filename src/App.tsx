import {Suspense} from 'react';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle} from '@/global';
import {Router} from '@/Router';
import {defaultTheme} from './styles/themes/default';
import SuspenseLoader from '@/components/SuspenseLoader';
import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from '@/context/Auth';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Suspense fallback={<SuspenseLoader />}>
        <BrowserRouter>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </BrowserRouter>
      </Suspense>
      <GlobalStyle />
    </ThemeProvider>
  );
}
