import React, { Component } from 'react'

export default class Count extends Component {
  state = {
    sum: 0,
    selectValue: 0,
  };

  handleStateChange = prop => 
    e => this.setState({ [prop]: e.target.value });

  handleIncrease = () => {
    const { sum, selectValue } = this.state;
    this.setState({ sum: sum + selectValue*1 });
  };

  handleDecrease = () => {
    const { sum, selectValue } = this.state;
    this.setState({ sum: sum - selectValue*1 });
  };

  handleIncreaseIfOdd = () => {
    const { sum } = this.state;
    if(sum % 2 !== 0) 
      this.handleIncrease();
  };

  handleIncreaseWithAsnc = () => {
    setTimeout(this.handleIncrease, 1000);
  };

  render() {
    const { sum, selectValue } = this.state;
    return (
      <div>
        <h2>当前求和为：{ sum }</h2>
        <select value={ selectValue } onChange={ this.handleStateChange('selectValue') }>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select><hr />

        <button onClick={ this.handleIncrease }>+</button><hr />
        <button onClick={ this.handleDecrease }>-</button><hr />
        <button onClick={ this.handleIncreaseIfOdd }>add in odd</button><hr />
        <button onClick={ this.handleIncreaseWithAsnc }>add with async</button>
      </div>
    )
  }
}
