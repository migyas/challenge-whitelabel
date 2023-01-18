import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./global";
import { Router } from "./Router";
import { defaultTheme } from "./styles/themes/default";
import { Suspense } from "react";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Suspense fallback={"...loading"}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Suspense>
      <GlobalStyle />
    </ThemeProvider>
  );
}
