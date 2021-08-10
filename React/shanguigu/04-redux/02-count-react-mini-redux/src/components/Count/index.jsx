import React, { Component } from 'react';
import Store from "../../redux/index.js";
import { INCREASE, DECREASE } from "../../redux/constant";


export default class Count extends Component {
  state = {
    selectValue: 0,
  };

  handleStateChange = prop => 
    e => this.setState({ [prop]: e.target.value });

  handleIncrease = () => {
    const { selectValue } = this.state;
    Store.dispatch({
      type: INCREASE,
      data: selectValue*1,
    });
  };

  handleDecrease = () => {
    const { selectValue } = this.state;
    Store.dispatch({
      type: DECREASE,
      data: selectValue*1,
    });
  };

  handleIncreaseIfOdd = () => {
    if(Store.getState() % 2 !== 0) 
      this.handleIncrease();
  };
 
  handleIncreaseWithAsnc = () => {
    setTimeout(this.handleIncrease, 1000);
  };

  render() {
    const { selectValue } = this.state;
    return (
      <div>
        <h2>当前求和为：{ Store.getState() }</h2>
        <select
          value={ selectValue }
          onChange={ this.handleStateChange('selectValue') }
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select><hr />

        <button onClick={ this.handleIncrease }>+</button><hr />
        <button onClick={ this.handleDecrease }>-</button><hr />
        <button onClick={ this.handleIncreaseIfOdd }>add in odd</button><hr />
        <button onClick={ this.handleIncreaseWithAsnc }>
          add with async
        </button>
      </div>
    )
  }
}
