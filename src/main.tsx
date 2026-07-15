import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import { AppToaster } from "./components/AppToaster";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppToaster />
      <Router />
    </BrowserRouter>
  </StrictMode>
);
