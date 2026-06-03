import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { I18nProvider } from "./i18n";
import { ThemeProvider } from "./theme";
import { ExperienceProvider } from "./experience";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <ExperienceProvider>
          <App />
        </ExperienceProvider>
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>
);
