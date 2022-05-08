import React from "react";
import ReactDOM from "react-dom/client";
import SignUpForm from "./Components/SignUpForm/SignUpForm";

import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SignUpForm />
  </React.StrictMode>
);
