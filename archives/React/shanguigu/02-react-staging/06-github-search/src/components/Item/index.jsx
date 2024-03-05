import React, { Component } from 'react';
import './index.scss';

export default class index extends Component {
  render() {
    const { info } = this.props
    return (
      <div className="user-item">
        <div className="avator">
          <a href={ info.html_url } target="_blank" rel="noopener noreferrer">
            <img src={ info.avatar_url} alt="avator" />
          </a>
        </div>
        <p>{ info.login}</p>
      </div>
    )
  }
}
