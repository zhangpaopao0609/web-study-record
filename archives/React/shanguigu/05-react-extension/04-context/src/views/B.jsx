import React, { Component } from 'react'
import C from "./C";

export default class B extends Component {
  render() {
    return (
      <div>
        <h3>父亲辈</h3>
        <C />
      </div>
    )
  }
}
