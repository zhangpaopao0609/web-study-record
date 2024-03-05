import React, { Component } from 'react';
import { NavBar, InputItem, Button, Toast } from 'antd-mobile';

import "./index.less";
import { phoneNumberReg, validateNumberReg } from "../../config/reg.js";

export default class Login extends Component {
  timer = null;
  state = {
    phoneNumber: '',
    validateCode: '',
    delayTime: 10,
    status: true,
  };

  validate = () => {
    const { phoneNumber, validateCode } = this.state;
    if(!phoneNumberReg.test(phoneNumber)) {
      Toast.fail('请输入合法的手机号码');
      return false;
    };
    if(!validateNumberReg.test(validateCode)) {
      Toast.fail('请输入合法的验证码');
      return false;
    };
    return true;
  };

  recoverStatus = () => {
    this.timer = setInterval(() => {
      const { delayTime } = this.state;
      if(delayTime === 0) {
        this.setState({
          delayTime: 10,
          status: true,
        });
        clearInterval(this.timer);
        this.timer = null;
        return;
      }
      this.setState({
        delayTime: this.state.delayTime - 1,
      });
    }, 1000);
  };

  getValidateNumber = () => {
    const { status, phoneNumber } = this.state;
    if(!status) return;
    if(!phoneNumberReg.test(phoneNumber))
      return Toast.fail('请输入合法的手机号码');
    this.setState({
      status: false,
    });

    // 启动定时器，修改 delayTime
    this.recoverStatus()
  };

  login = () => {
    if(!this.validate()) return;
    const { phoneNumber, validateCode } = this.state;
    console.log(`发起登陆请求, 手机号码: ${phoneNumber}, 验证码: ${validateCode}`);
  };

  changeState = prop => e => this.setState({ [prop]: e });

  render() {
    const { phoneNumber, validateCode, status, delayTime } = this.state;
    return (
      <div>
        <NavBar mode="light"> 手机验证码登陆  </NavBar>
        <div className="login-container">
          <InputItem
            clear
            placeholder="输入手机号"
            value={ phoneNumber }
            onChange={ this.changeState('phoneNumber') }
          ></InputItem>

          <div className="input-validate-number">
            <InputItem
              className="input"
              clear
              placeholder="输入6位验证码"
              value={ validateCode }
              onChange={ this.changeState('validateCode') }
            ></InputItem>
            <button 
              className={ status ? 'get-validate' : 'disabled get-validate' } 
              onTouchEnd={ this.getValidateNumber }
            >
              { 
                status 
                ? '获取验证码'
                : `${delayTime} 秒后重新获取` 
              }
            </button>
          </div>

          <div className="footer">
            <Button type="primary" onTouchEnd={ this.login }>登陆</Button>
            <p>
              未注册的手机号验证后会自动创建Arrow账号，登陆即代表您同意
              <a href="http://note.arrow-zb.cn">《Arrow隐私政策》</a>
            </p>
          </div>
        </div>
      </div>
    )
  }
};
