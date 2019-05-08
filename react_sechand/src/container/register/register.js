import React from 'react';
import {
  Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import { Link } from 'react-router-dom'

import axios from 'axios';
import "./register.css"
const Api = require('../../config/config');

class Register extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      axios({
        method: "POST",
        url: `${Api.HOST}/api/users/register`,
        data: values,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization':'Bearer '+token
        }
      }).then(function (res) {
        console.log(res);
        if (res.data.code === 0) {
          console.log(res);
          message.success('注册成功！');
        } else {
          message.error(`注册失败！${res.data.error}`);
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

            <h2>员工管理系统·注册</h2>
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
              注册
          </Button>
            Or <Link to="/">
              现在登陆！
              </Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const WrappedNormalRegisterForm = Form.create({ name: 'normal_registerForm' })(Register);
export default WrappedNormalRegisterForm