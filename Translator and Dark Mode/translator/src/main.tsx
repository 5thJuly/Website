import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n.js";

// Thiết lập theme mặc định (dark hoặc light) khi ứng dụng khởi động
const defaultTheme = localStorage.getItem("theme") || "dark";
document.body.setAttribute("data-theme", defaultTheme);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
