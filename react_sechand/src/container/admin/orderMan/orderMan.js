import React from 'react';
import { Link } from 'react-router-dom'
import {
  Form, Icon, Input, Button, Checkbox, Table, Divider, Row, Col, message, Popconfirm, Select, Modal
} from 'antd';

import SideBar from '../../../components/siderBar/sideBar';
import Header from '../../../components/header/header';
import axios from 'axios';
import "./orderMan.css"
const Api = require('../../../config/config');


const { Option } = Select;

class OrderMan extends React.Component {

  state = {
    data: [],
    id: "",
    trackingCompany: "",
    trackingNumber: "",
    visible: false,
    pageSize: 10
  }

  componentDidMount() {
    this.getUserorder()
  }

  getUserorder = (data) => {
    let token = window.localStorage.getItem("token")
    let _this = this;
    axios({
      method: "GET",
      url: `${Api.HOST}/api/userorder`,
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
          allOrderPrice: res.data.data.allOrderPrice,
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
      this.getUserorder(values)
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  deleteUserorder = (id) => {
    const token = window.localStorage.getItem("token");
    const _this = this;
    axios({
      method: "DELETE",
      url: `${Api.HOST}/api/userorder/${id}`,
      data: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.code === 0) {
        _this.getUserorder()
        message.success('删除成功！');
      } else {
        message.error('删除失败！');
      }

    });
  }

  confirm = (id) => {
    this.deleteUserorder(id)
  }

  cancel = (e) => {
    console.log(e);
  }

  showModal = (id) => {
    this.setState({
      visible: true,
      id: id,
    });
  }

  handleOk = (e) => {
    console.log(e);
    const { trackingNumber, trackingCompany, id } = this.state
    if (!trackingNumber || !trackingCompany || !id) {
      message.error('请输入完整信息');
      return
    }
    let values = {
      trackingNumber: trackingNumber,
      trackingCompany: trackingCompany,
    }
    this.setState({
      visible: false,
    }, () => {
      this.putUserorder(id, values)
    });
  }

  putUserorder = (id, values) => {
    const token = window.localStorage.getItem("token");
    const _this = this
    values.orderState = 2
    axios({
      method: "PUT",
      url: `${Api.HOST}/api/users/userorder/${id}`,
      data: values,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.code === 0) {
        message.success('发货成功！');
        _this.getUserorder()
      } else {
        message.error('发货失败！');
      }

    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleChangeCompany = (value) => {
    this.setState({
      trackingCompany: value
    })
  }

  handleChangeTrackingNumber = (e) => {
    this.setState({
      trackingNumber: e.target.value
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data, pageSize } = this.state;

    // const {id} = this.props.match
    const columns = [{
      title: '订单编号',
      dataIndex: 'id',
      width: 50,
    }, {
      title: '买家',
      dataIndex: 'user',
      width: 50,
      render: (text, record) => (
        <div>{record.user && record.user.username}({record.user && record.user.authority.name})</div>
      )
    }, {
      title: '订单总价',
      dataIndex: 'price',
      width: 50,
    }, {
      title: '订单原价',
      dataIndex: 'originalPrice',
      width: 50,
    }, {
      title: '收货地址',
      dataIndex: 'address',
      width: 150,
    }, {
      title: '订单商品',
      dataIndex: 'product',
      width: 250,
      render: (text, record) => (
        <div>
          {
            record.product ? record.product.name : ""
          }
          [{
            record.product ? record.product.transactionMode : ""
          }]
            <div style={{ color: "red" }}>
            {
              record.product.user ? record.product.user.username : ""
            }
            ({
              record.product.user.authority ? record.product.user.authority.name : ""
            })发布
            </div>
        </div>
      )
    }, {
      title: '订单状态',
      dataIndex: 'orderState',
      width: 150,
      render: (text, record) => {
        let state = null
        if (record.orderState == "-1") {
          state = "已取消"
        } else if (record.orderState == "1") {
          state = "待发货"
        } else if (record.orderState == "2") {
          state = "已发货"
        } else if (record.orderState == "3") {
          state = "已完成"
        }
        return <div>
          <p>{state}</p>
          {
            Number(record.orderState) > 1 && record.product.transactionMode == "在线交易" ? <p>快递公司：{record.trackingCompany}</p> : null
          }
          {
            Number(record.orderState) > 1 && record.product.transactionMode == "在线交易" ? <p>快递单号：{record.trackingNumber}</p> : null
          }
        </div>
      }
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          {
            record.orderState == "1" && record.product.user.authority.name == "admin" && record.product.transactionMode == "在线交易" ? <a onClick={() => this.showModal(record.id)} href="javascript:;">发货 </a> : null
          }
          {
            record.orderState == "1" && record.product.user.authority.name == "admin" && record.product.transactionMode == "见面交易" ? <a onClick={() => this.putUserorder(record.id, {})} href="javascript:;">发货 </a> : null
          }
          {/* <Divider type="vertical" /> */}
          {/* <Link to={'/admin/order/edit/' + record.id}>编辑</Link> */}
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
          <SideBar {...this.props} cur="orderMan" />
          <div className="OrderMan">
            <Form
              className="ant-advanced-search-form"
              onSubmit={this.handleSearch}
            >
              <Row gutter={24}>
                <Col span={12} >
                  <Form.Item label='订单id'>
                    {getFieldDecorator('id', {
                      rules: [{
                        required: true,
                        message: '请输入订单id',
                      }],
                    })(
                      <Input placeholder="请输入订单id" />
                    )}
                  </Form.Item>
                </Col>

                <Col span={12} >
                  <Form.Item
                    label={(
                      <span>
                        订单状态
                      </span>
                    )}
                  >
                    {getFieldDecorator('state', {
                      rules: [{ required: true, message: '订单状态!', whitespace: true }],
                    })(
                      <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="请选择订单状态"
                        optionFilterProp="children"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        <Option key="0" value="" >全部</Option>
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
          <Modal
            title="请选择快递公司并输入快递单号"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <p>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择快递公司"
                optionFilterProp="children"
                onChange={this.handleChangeCompany}
                onFocus={handleFocus}
                onBlur={handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option key="0" value="顺丰" >顺丰</Option>
                <Option key="1" value="圆通" >圆通</Option>
                <Option key="2" value="韵达" >韵达</Option>
                <Option key="3" value="中通" >中通</Option>
                <Option key="4" value="EMS" >EMS</Option>
                <Option key="5" value="其他" >其他</Option>
              </Select>
            </p>
            <p><Input placeholder="请输入快递单号" onChange={this.handleChangeTrackingNumber} /></p>
          </Modal>
        </div>
      </div>

    );
  }
}

const WrappedOrderManForm = Form.create({ name: 'OrderMan_search' })(OrderMan);
export default WrappedOrderManForm
