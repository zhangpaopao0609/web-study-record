import React, { Component } from 'react';
import './index.scss';

import axios from "axios";

export default class Search extends Component {
  state = {
    searchValue: '',
  };

  setStateSearchValue = value => {
    this.setState({
      searchValue: value,
    });
  };

  handleSearchValueChange = e => {
    this.setStateSearchValue(e.target.value)
  };

  searchAction = (url, params, method='GET') => {
    return axios({
      url,
      params,
      method,
    });
  };

  handleSearch = async () => {
    const { searchValue } = this.state;
    if(!searchValue.trim()) {
      alert('输入不能为空！');
      return;
    };
    this.props.updateUserState({ userRequestStatus: 1 });
    const res = await this.searchAction(
      'https://api.github.com/search/users',
      { q: searchValue },
    );
    this.setStateSearchValue('');
    this.props.updateUserState({ 
      userList: res.data.items,
      userRequestStatus: 2, 
    });
  }; 

  render() {
    const { searchValue } = this.state;
    return (
      <div>
        <h2>GitHub 搜索引擎</h2>
        <input type="text" value={ searchValue } onChange={ this.handleSearchValueChange }/>
        <button onClick={ this.handleSearch }>搜索</button>
      </div>
    )
  };
};
