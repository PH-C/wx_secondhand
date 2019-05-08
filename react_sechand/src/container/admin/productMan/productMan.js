import React from 'react';
import { Link } from 'react-router-dom'
import {
  Form, Icon, Input, Button, Checkbox, Table, Divider, Row, Col, message, Popconfirm, Select
} from 'antd';

import SideBar from '../../../components/siderBar/sideBar';
import Header from '../../../components/header/header';
import axios from 'axios';
import "./productMan.css"

const { Option } = Select;
const Api = require('../../../config/config');

class ProductMan extends React.Component {

  state = {
    data: [],
    pageSize: 10
  }

  componentDidMount() {
    this.getProduct()
  }

  getProduct = (data) => {
    let token = window.localStorage.getItem("token")
    let _this = this;
    axios({
      method: "GET",
      url: `${Api.HOST}/api/product`,
      params: data || {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.code === 0) {

        _this.setState({
          data: res.data.data.rows,
          count: res.data.data.count,
          // pageSize:res.data.data.pageSize
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
      this.getProduct(values)
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  deleteProduct = (id) => {
    const token = window.localStorage.getItem("token");
    const _this = this;
    axios({
      method: "DELETE",
      url: `${Api.HOST}/api/users/product/${id}`,
      data: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.code === 0) {
        _this.getProduct()
        message.success('删除成功！');
      } else {
        message.error('删除失败！');
      }

    });
  }

  confirm = (id) => {
    this.deleteProduct(id)
  }

  cancel = (e) => {
    console.log(e);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data, pageSize } = this.state;

    // const {id} = this.props.match
    const columns = [{
      title: '商品名称',
      dataIndex: 'name',
      width: 100,
    }, {
      title: '商品价格',
      dataIndex: 'price',
      width: 50,
    },{
      title: '类型',
      dataIndex: 'type',
      width: 50,
    }, {
      title: '卖家',
      dataIndex: 'user',
      width: 50,
      render: (text, record) => (
        <div>{record.user && record.user.username}({record.user&&record.user.authority.name})</div>
      )
    },{
        title: '联系方式',
        dataIndex: 'mobile',
        width: 50,
    }, {
      title: '交易方式',
      dataIndex: 'transactionMode',
      width: 50,
    },{
      title: '邮费',
      dataIndex: 'postage',
      width: 50,  
    }, {
      title: '出售状态',
      dataIndex: 'sellState',
      width: 50,
      render: (text, record) => {
        if (record.sellState == "-1") {
          return "已取消"
        } else if (record.sellState==0){
          return "未出售"
        } else if (record.sellState == "1") {
          return "待发货"
        } else if (record.sellState == "2") {
          return "已发货"
        } else if (record.sellState == "3") {
          return "已完成"
        }
      }
    },{
      title: '商品描述',
      dataIndex: 'describe',
      width: 450,
    },
     {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          {/* <a href="javascript:;">查看 {record.name}</a>
          <Divider type="vertical" /> */}
          <Link to={'/admin/product/edit/' + record.id}>编辑</Link>
          <Divider type="vertical" />
          <Popconfirm title="你要删除吗?" onConfirm={(e) => this.confirm(record.id)} onCancel={(e) => this.cancel(e)} okText="Yes" cancelText="No">
            <a href="javascript;;">删除</a>
          </Popconfirm>

        </span>
      )
    }];
    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    function handleBlur() {
      console.log('blur');
    }

    function handleFocus() {
      console.log('focus');
    }

    return (
      <div className="admin">
        <Header />
        <div className="admin-down">
          <SideBar {...this.props} cur="productMan" />
          <div className="ProductMan">
            <Form
              className="ant-advanced-search-form"
              onSubmit={this.handleSearch}
            >
              <Row gutter={24}>
                <Col span={12} >
                  <Form.Item label='名称'>
                    {getFieldDecorator('name', {
                      rules: [{
                        required: true,
                        message: '请输入名称',
                      }],
                    })(
                      <Input placeholder="请输入名称" />
                    )}
                  </Form.Item>
                </Col>

                <Col span={12} >
                  <Form.Item
                    label={(
                      <span>
                        商品状态
                      </span>
                    )}
                  >
                    {getFieldDecorator('state', {
                      rules: [{ required: true, message: '商品状态!', whitespace: true }],
                    })(
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择商品状态"
                        optionFilterProp="children"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        <Option key="0" value="all" >全部</Option>
                        <Option key="1" value="1" >待发货</Option>
                        <Option key="2" value="2" >已发货</Option>
                        <Option key="3" value="3" >已完成</Option>
                        <Option key="-1" value="-1" >已取消</Option>
                      </Select>
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

const WrappedProductManForm = Form.create({ name: 'productMan_search' })(ProductMan);
export default WrappedProductManForm
