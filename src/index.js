import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import Reducer from './reducer'
import "./index.scss"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Reducer}>
    <App />
  </Provider>
);
