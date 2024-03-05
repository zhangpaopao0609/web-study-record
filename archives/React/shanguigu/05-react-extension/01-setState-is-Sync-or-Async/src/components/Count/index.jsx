import React, { Component } from 'react'

export default class Count extends Component {
  state = {
    sum: 0,
  };

  // 这是由 react 事件监听的回调，因此，在这里面的 setState 更新状态的动作是异步的
  handleAddSum_1 = () => {
    const { sum } = this.state;
    this.setState({
      sum: sum + 1,
    });
    console.log(this.state.sum);
  };

  componentDidMount() {
    const { sum } = this.state;
    // 这是由 react 事件监听的生命周期，因此，在这里面的 setState 更新状态的动作是异步的
    this.setState({
      sum: sum + 1,
    });
    console.log(this.state.sum);

    // 这里的 setState 更新状态的动作是同步的，因为 setState 所处的位置是在非 react 控制的原生事件中，也是异步回调
    this.button3.onclick = () => {
      const { sum } = this.state;
      this.setState({
        sum: sum + 3,
      });
      console.log(this.state.sum);
    };
  }

  // 这里的 setState 更新状态的动作是同步的，因为 setState 所处的位置是在非 react 控制的异步回调中
  handleAddSum_2 = () => {
    const { sum } = this.state;
    setTimeout(() => {    // setState 处在了 setTimeout 的异步回调中
      this.setState({
        sum: sum + 2,
      });
      console.log(this.state.sum);
    }, 1000);
  };

  render() {
    const { sum } = this.state;
    return (
      <div>
        <h2>{ sum }</h2>
        <button onClick={ this.handleAddSum_1 }>1. 点我加1</button>
        <button onClick={ this.handleAddSum_2 }>2. 点我加2</button>
        <button ref={ c => this.button3 = c }>3. 点我加3</button>
      </div>
    )
  }
};
