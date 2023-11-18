import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./core/AppRouter.routes";
import { BrowserRouter } from "react-router-dom";
import "../app/globals.css";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
