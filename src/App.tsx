import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { DefaultContainer } from "./components/DefaultContainer/DefaultContainer";
import { Home } from "./components/Home/Home";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";

import "../node_modules/bootstrap-italia/dist/css/bootstrap-italia.min.css";
import "./App.scss";

/**
 * Entry point for app, with first level routing
 */

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App vh-100">
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
          <Route path="/(creating-docs|docs-sent)" component={LoadingScreen} />
          <Route path="/*" component={DefaultContainer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
