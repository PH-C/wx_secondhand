import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import { Link } from 'react-router-dom'

import axios from 'axios';
import "./login.css"
const Api = require('../../config/config');

class Login extends React.Component {

  handleSubmit = (e) => {
    const _this = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      axios({
        method: "POST",
        url: `${Api.HOST}/api/users/adminlogin`,
        data: values,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization':'Bearer '+token
        }
      }).then(function (res) {
        console.log(res);
        if (res.data.code === 0) {
          const token = res.data.token;
          const user = res.data.data;
          window.localStorage.setItem("token", token)
          window.localStorage.setItem("user", JSON.stringify(user))
          message.success('登录成功！');
          _this.props.history.push('/admin/user/manage')
        } else {
          message.error('登录失败！');
        }

      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-form">
        <Form onSubmit={this.handleSubmit} >
          <Form.Item>
            <h2>校园闲置商城后台管理系统·登录</h2>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>

          <Form.Item>

            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>

          </Form.Item>
        </Form>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm