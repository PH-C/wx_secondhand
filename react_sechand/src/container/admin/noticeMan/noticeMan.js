import React from 'react';
import { Link } from 'react-router-dom'
import {
  Form, Icon, Input, Button, Checkbox, Table, Divider, Row, Col, message, Popconfirm
} from 'antd';

import SideBar from '../../../components/siderBar/sideBar';
import Header from '../../../components/header/header';
import axios from 'axios';
import "./noticeMan.css";
const Api = require('../../../config/config');

class NoticeMan extends React.Component {

  state = {
    departments: [],
    data: [],
    pageSize: 10
  }

  componentDidMount() {
    this.getNotice()
  }

  getNotice = (data) => {
    let token = window.localStorage.getItem("token")
    let _this = this;
    axios({
      method: "GET",
      url: `${Api.HOST}/api/notice`,
      params: data || {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.code === 0) {

        _this.setState({
          count: res.data.data.count,
          data: res.data.data.rows,
          pageSize: res.data.pageSize
        })

      } else {
        message.error('登录失败！');
      }

    });
  }


  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
      values.title = values.title ? values.title.replace(/(^\s*)|(\s*$)/g, "") : values.title
      this.getNotice(values)
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  deleteNotice = (id) => {
    const token = window.localStorage.getItem("token");
    const _this = this;
    axios({
      method: "DELETE",
      url: `${Api.HOST}/api/notice/${id}`,
      data: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.code === 0) {
        _this.getNotice()
        message.success('删除成功！');
      } else {
        message.error('删除失败！');
      }

    });
  }

  confirm = (id) => {
    this.deleteNotice(id)
  }

  cancel = (e) => {
    console.log(e);
  }



  render() {
    const { data, pageSize } = this.state;
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      width: 150,
    },{
      title: '内容',
      dataIndex: 'content',
      width: 450,
      
    }, {
      title: '创建时间',
      dataIndex: 'created_at',
      width: 150,
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          {/* <Link to={'/admin/member/detail/' + record.id}>查看{record.username}简历</Link>
          <Divider type="vertical" /> */}
          <Link to={'/admin/notice/edit/' + record.id}>编辑</Link>
          <Divider type="vertical" />
          <Popconfirm title="你要删除吗?" onConfirm={(e) => this.confirm(record.id)} onCancel={(e) => this.cancel(e)} okText="Yes" cancelText="No">
            <a href="javascript;;">删除</a>
          </Popconfirm>
        </span>
      )
    }];

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="admin">
        <Header />
        <div className="admin-down">
          <SideBar {...this.props} cur="noticeMan" />
          <div className="noticeMan">
            <Form
              className="ant-advanced-search-form"
              onSubmit={this.handleSearch}
            >
              <Row gutter={24}>
                <Col span={12} >
                  <Form.Item label='标题'>
                    {getFieldDecorator('title', {
                      rules: [{
                        message: '请输入标题', whitespace: true
                      }],
                    })(
                      <Input placeholder="请输入标题" />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: 'right', paddingBottom: '20px' }}>
                  <Button type="primary" htmlType="submit">查询</Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                      清除
                  </Button>
                </Col>
              </Row>
            </Form>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize }}
              scroll={{ y: 350 }} />
          </div>
        </div>
      </div>

    );
  }
}
const WrappednoticeManForm = Form.create({ name: 'advanced_search' })(NoticeMan);
export default WrappednoticeManForm