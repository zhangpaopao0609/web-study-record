import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  handleGetStduentsInfo = async () => {
    const res = await axios({
      method: 'GET',
      url: '/api_1/students'
    });
    console.log(res.data);
  };

  handleGetCarsInfo = async () => {
    const res = await axios({
      method: 'GET',
      url: '/api_2/cars'
    });
    console.log(res.data);
  };

  render() {
    return (
      <div>
        <button onClick={ this.handleGetStduentsInfo }>点击获取学生信息</button>
        <br />
        <button onClick={ this.handleGetCarsInfo }>点击获取轿车信息</button>
      </div>
    );
  };
};
