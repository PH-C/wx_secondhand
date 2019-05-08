import React from 'react';

import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, message, Upload, Modal
} from 'antd';

import SideBar from '../../../components/siderBar/sideBar';
import Header from '../../../components/header/header';
import axios from 'axios';
import "./noticeAdd.css";
const Api = require('../../../config/config');

const { Option } = Select;
const { TextArea } = Input;

class NoticeAdd extends React.Component {
  state = {
    confirmDirty: false,
    authorities: [],
    data: {},
    action: "add",
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  componentDidMount() {
    const { path, params } = this.props.match
    if (path === "/admin/notice/edit/:id") {
      this.getNotice(params.id)
    }
  }

  getNotice = (id) => {
    let token = window.localStorage.getItem("token")
    let _this = this;

    axios({
      method: "GET",
      url: `${Api.HOST}/api/notice/${id}`,
      params: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.code === 0) {
        const data = res.data.data
        _this.setState({
          data: data,
          action: "edit"
        }, () => {
          for (let key in data) {
            data[key] = {
              value: data[key]
            }
          }
          _this.props.form.setFields(data)

        })

      } else {
        message.error('登录失败！');
      }

    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    const { path, params } = this.props.match

    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log("values", values)
      if (!err) {
        console.log('Received values of form: ', values);
        if (path === "/admin/notice/edit/:id") {
          this.putNotice(params.id, values)
        } else {
          this.postNotice(values)
        }
      }


    });
  }

  postNotice(values) {
    const token = window.localStorage.getItem("token");
    axios({
      method: "POST",
      url: `${Api.HOST}/api/notice`,
      data: values,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.code === 0) {
        message.success('添加成功！');
      } else {
        message.error('添加失败！');
      }

    });
  }

  putNotice(id, values) {
    const token = window.localStorage.getItem("token");
    axios({
      method: "PUT",
      url: `${Api.HOST}/api/notice/${id}`,
      data: values,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.code === 0) {
        message.success('修改成功！');
      } else {
        message.error('修改失败！');
      }

    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;
   
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    return (
      <div className="admin">
        <Header />
        <div className="admin-down">
          <SideBar {...this.props} cur="noticeAdd" />
          <div className="noticeAdd">
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

              <Form.Item
                label={(
                  <span>
                    标题
                </span>
                )}
              >
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入标题!', whitespace: true }],
                })(
                  <Input />
                )}
              </Form.Item>

              <Form.Item
                label={(
                  <span>
                    内容
                </span>
                )}
              >
                {getFieldDecorator('content', {
                  rules: [{ required: true, message: '请输入内容!', whitespace: true }],
                })(
                  <Input.TextArea />
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">保存</Button>
              </Form.Item>

            </Form>
          </div>
        </div>
      </div>

    );
  }
}
const WrappednoticeAddForm = Form.create({ name: 'Notice-add' })(NoticeAdd);
export default WrappednoticeAddForm