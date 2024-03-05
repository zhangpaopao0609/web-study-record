import React, { Component } from 'react';
import Store from "../../redux/index.js";
import { 
  increaseAction,
  decreaseAction,
  increaseAsyncAction
} from "../../redux/count/actions";

export default class Count extends Component {
  state = {
    selectValue: 0,
  };

  handleStateChange = prop => 
    e => this.setState({ [prop]: e.target.value });

  handleIncrease = () => {
    const { selectValue } = this.state;
    Store.dispatch(increaseAction(selectValue*1));
  };

  handleDecrease = () => {
    const { selectValue } = this.state;
    Store.dispatch(decreaseAction(selectValue*1));
  };

  handleIncreaseIfOdd = () => {
    if(Store.getState() % 2 !== 0) 
      this.handleIncrease();
  };
 
  handleIncreaseWithAsnc = async () => {
    const { selectValue } = this.state;
    Store.dispatch(await increaseAsyncAction(selectValue*1, 1000));
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
