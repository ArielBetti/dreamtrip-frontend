import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./core/AppRouter.routes";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

import "../app/globals.css";
import "react-photo-view/dist/react-photo-view.css";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { ThemeProvider } from "./components/theme-provider";
import HeaderGeneric from "./components/compose/HeaderGeneric";
import Navigation from "./components/compose/Navigation";
import { StrictMode } from "react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="dreamtrip-ui-theme">
        <BrowserRouter>
          <HeaderGeneric />
          <AppRouter />
          <Navigation />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
