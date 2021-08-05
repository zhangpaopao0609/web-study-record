import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.less";
import routes from "./config/routes.js";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          { routes.map(item => <Route key={ item.path } {...item}/>) }
          <Redirect to="/login"/>
        </Switch>
      </div>
    );
  };
};
