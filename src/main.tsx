import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
const root = document.getElementById("root")!;

createRoot(root!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);

// remove loader AFTER render starts
const loader = document.getElementById("app-loader");

if (loader) {
  loader.style.opacity = "0";
  loader.style.transition = "opacity 0.4s ease";

  setTimeout(() => loader.remove(), 400);
}
