import {Suspense} from 'react';
import {ThemeProvider} from 'styled-components';
import {ToastContainer} from 'react-toastify';
import {BrowserRouter} from 'react-router-dom';
import {GlobalStyle} from '@/global';
import {Router} from '@/Router';
import {defaultTheme} from './styles/themes/default';
import SuspenseLoader from '@/components/SuspenseLoader';
import {AuthProvider} from '@/context/Auth';

import 'react-toastify/dist/ReactToastify.css';
import '@/components/ToastAlert/toastify.css';
import {UserProvider} from './context/Users';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Suspense fallback={<SuspenseLoader />}>
        <BrowserRouter>
          <UserProvider>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </UserProvider>
        </BrowserRouter>
      </Suspense>
      <GlobalStyle />
      <ToastContainer />
    </ThemeProvider>
  );
}
