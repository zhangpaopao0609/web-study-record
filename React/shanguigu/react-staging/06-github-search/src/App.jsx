import React, { Component } from 'react'
import "./App.scss";

import Search from "./components/Search/index";
import List from "./components/List/index";

export default class App extends Component {
  state = {
    userList: [],
    userRequestStatus: 0,   // 0 初始；1请求中；2请求完成；3请求失败
  };

  updateUserState = obj => {
    this.setState(obj);
  };

  render() {
    return (
      <div className="container">
        <Search updateUserState={ this.updateUserState }/>
        <List { ...this.state }/>
    </div>
    )
  }
}

