import AlartProvider from "./AllProvider/AlartProvider";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AlartProvider>
      <App />
    </AlartProvider>
  </BrowserRouter>
);
