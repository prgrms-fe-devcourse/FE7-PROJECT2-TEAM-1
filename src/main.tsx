import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/font.css";
import "./css/global.css";
import "./css/index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import AuthBootstrap from "./components/AuthBootstrap.tsx";
import ToastProvider from "./components/toast/ToastProvider.tsx";
import AlarmProvider from "./components/alarm/AlarmProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthBootstrap />
      <ToastProvider />
      <AlarmProvider />
      <App />
    </BrowserRouter>
  </StrictMode>,
);
