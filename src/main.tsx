import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            textAlign: "center",
            direction: "rtl",
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            fontFamily: "IRANSansXFaNum",
          },
        }}
      />
      <Router />
    </BrowserRouter>
  </StrictMode>
);
