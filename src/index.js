import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

const routes = (
  <BrowserRouter>
    <Route path="/" exact component={App}></Route>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>{routes}</React.StrictMode>,
  document.getElementById("root")
);
