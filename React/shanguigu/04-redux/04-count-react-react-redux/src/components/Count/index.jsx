import React, { Component } from 'react';
import { connect } from "react-redux";

import { 
  increaseAction,
  decreaseAction,
  increaseAsyncAction,
} from "../../redux/count/actions";

class CountUI extends Component {
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
    this.props.decreaseAction(selectValue*1);
  };

  handleIncreaseIfOdd = () => {
    const { selectValue } = this.state;
    if(this.props.sum % 2 !== 0) 
      this.props.increaseAction(selectValue*1);
  };
 
  handleIncreaseWithAsnc = async () => {
    const { selectValue } = this.state;
    this.props.increaseAsyncAction(selectValue*1)
  };

  render() {
    const { selectValue } = this.state;
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
};

export default connect(
  state => ({ sum: state }),
  {
    increaseAction,
    decreaseAction,
    increaseAsyncAction,
  },
)(CountUI);
