import { scan } from "react-scan"; // must be imported before React and React DOM
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { ResponsiveProvider } from "./context/ResponsiveContext";
const root = document.getElementById("root")!;
scan({
  enabled: true,
});
createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ResponsiveProvider>
          <App />
        </ResponsiveProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);

// remove loader AFTER render starts
const loader = document.getElementById("app-loader");
if (loader) {
  loader.style.opacity = "0";
  loader.style.transition = "opacity 0.4s ease";
  loader.remove();
  // setTimeout(() => loader.remove(), 400);
}
