import React, { Component, Fragment } from 'react'

export default class Weather extends Component {
  state = {
    isHot: false,
  };
  
  handleChangeWeather = () => {
    const { isHot } = this.state;
    this.setState({
      isHot: !isHot,
    });
  };

  render() {
    const { isHot } = this.state;
    return (
      <Fragment>
        <p>
          今天天气真{ isHot ? "炎热" : '凉爽' }
        </p>
        <button onClick={ this.handleChangeWeather }>切换天气</button>
      </Fragment>
    )
  }
};
