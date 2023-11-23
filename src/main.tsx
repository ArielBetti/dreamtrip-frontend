import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./core/AppRouter.routes";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

import "../app/globals.css";
import "react-photo-view/dist/react-photo-view.css";
import { ThemeProvider } from "./components/theme-provider";
import HeaderGeneric from "./components/compose/HeaderGeneric";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="dreamtrip-ui-theme">
        <BrowserRouter>
          <HeaderGeneric />
          <AppRouter />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
