import React, { Component } from 'react';
import { connect } from "react-redux";

import { addPersonAction } from "../../redux/person/actions.js";

class PersonUI extends Component {
  state = {
    name: '',
    age: '',
  };

  changeState = prop => e => this.setState({ [prop]: e.target.value });

  handleAddPerson = () => {
    const { name, age } = this.state;
    if(!name || !age) return;
    this.props.addPersonAction({ name, age });
    this.setState({ name: '', age: '' });
  };

  render() {
    const { name, age } = this.state;
    const { person } = this.props.store;
    return (
      <div>
        <h2>Person</h2>
        <input value={ name } onChange={ this.changeState('name') } type="text" placeholder="名字"/>
        <input value={ age } onChange={ this.changeState('age') } type="text" placeholder="年龄"/>
        <button onClick={ this.handleAddPerson }>添加</button>

        <ul>
          {
            person.map((item, index) => (
              <li key={ index }>{ item.name }--{ item.age }</li>
            ))
          }
        </ul>
      </div>
    );
  };
};

export default connect(
  store => ({ store }),
  {
    addPersonAction,
  },
)(PersonUI);
