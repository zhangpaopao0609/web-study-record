import React, { Component } from 'react';
import './index.scss';

import Item from "../Item/index";

export default class List extends Component {
  firstTimeRender = () => {
    return <p>Enter name to get UersInfo</p>;
  };

  loadingRender = () => {
    return <p>Loading result!!</p>;
  };

  userListRender = () => {
    const { userList } = this.props;
    return userList.length > 0
      ? userList.map(item => <Item key={ item.id } info={ item }/>)
      : <p>There is no Data!!</p>
  };

  errorRender = () => {
    return <p>Error!!</p>;
  };

  statusResponseRender = status => {
    const statusMap =  {
      0: this.firstTimeRender(),
      1: this.loadingRender(),
      2: this.userListRender(),
      3: this.errorRender(),
    };
    return statusMap[status];
  };

  render() {
    const { userRequestStatus } = this.props;
    return this.statusResponseRender(userRequestStatus)
  };
};
