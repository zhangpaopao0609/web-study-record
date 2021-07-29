import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import "./App.less";
import Login from "./views/Login/index";
import User from "./views/User/index";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/login" component={ Login }/>
          <Route path="/user" component={ User }/>
        </Switch>
      </div>
    )
  }
}
