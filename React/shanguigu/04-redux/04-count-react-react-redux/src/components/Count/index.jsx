import React, { Component } from 'react';

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
    this.props.increaseAction(selectValue*1);
  };

  handleDecrease = () => {
    const { selectValue } = this.state;
  };

  handleIncreaseIfOdd = () => {
    // if(Store.getState() % 2 !== 0) 
    //   this.handleIncrease();
  };
 
  handleIncreaseWithAsnc = async () => {
    const { selectValue } = this.state;
  };

  render() {
    const { selectValue } = this.state;
    console.log(this.props);
    return (
      <div>
        <h2>当前求和为：{ this.props.sum }</h2>
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
