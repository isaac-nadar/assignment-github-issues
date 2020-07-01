import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import IssueList from "./containers/issue-list/issue-list";
import { Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import reducer from "./store/reducers";
import { createStore, applyMiddleware } from "redux";

const store = createStore(reducer, applyMiddleware(ReduxThunk));

const routes = (
  <BrowserRouter>
    <App>
      <Redirect to="/nodejs/node/issues" />
      <Route exact path="/:org/:repo/issues" component={IssueList}>
        {/* <Route path="/"  /> */}
      </Route>
    </App>
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={store}>{routes}</Provider>,
  document.getElementById("root")
);
