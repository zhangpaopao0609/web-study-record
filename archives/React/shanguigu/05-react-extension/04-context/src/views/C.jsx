import React, { Component } from 'react';
import { MyContext } from "./MyContext.js";
import D from "./D";

export default class C extends Component {
  static contextType = MyContext;
  render() {
    return (
      <div>
        <h5>自己辈</h5>
        <h6>{this.context.name}--{this.context.age}</h6>

        <hr />
        <D />
      </div>
    )
  }
}
