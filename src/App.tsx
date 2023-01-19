import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./global";
import { Router } from "./Router";
import { defaultTheme } from "./styles/themes/default";
import { Suspense } from "react";
import { SuspenseLoader } from "./components/SuspenseLoader";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Suspense fallback={<SuspenseLoader />}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Suspense>
      <GlobalStyle />
    </ThemeProvider>
  );
}
