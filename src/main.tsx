import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
const queryClient = new QueryClient();
const root = document.getElementById("root")!;

createRoot(root!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);

// remove loader AFTER render starts
const loader = document.getElementById("app-loader");

if (loader) {
  loader.style.opacity = "0";
  loader.style.transition = "opacity 0.3s ease";

  setTimeout(() => loader.remove(), 300);
}
