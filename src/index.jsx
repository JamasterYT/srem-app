import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "aos/dist/aos.css"; // importujesz style AOS
import AOS from "aos"; // importujesz bibliotekę AOS

const root = document.getElementById("root");
const appRoot = ReactDOM.createRoot(root);
AOS.init();

appRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);