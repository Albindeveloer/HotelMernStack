import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthReducerProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthReducerProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthReducerProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
