import React from 'react';

import { MyContext } from "./MyContext.js";
const { Consumer } = MyContext;

export default function D() {
  return (
    <div>
      <h6>我是孙子辈</h6>
      <Consumer>
        {
          ({name, age}) => <p>{ name } -- { age }</p>
        }
      </Consumer>
    </div>
  )
}
