import React, { Component } from 'react'

import B from "./B";
import { MyContext } from "./MyContext.js";
const { Provider } = MyContext;

export default class A extends Component {
  state = {
    name: 'ardor',
    age: 18,
  }

  render() {
    return (
      <div>
        <h1>爷爷辈</h1>
        <Provider value={this.state}>
          <B />
        </Provider>
      </div>
    )
  }
}
