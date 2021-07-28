import React, { Component } from 'react'
import "./App.scss";

import { Button } from 'antd';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Button type="primary">Button</Button>
      </div>
    )
  }
}
