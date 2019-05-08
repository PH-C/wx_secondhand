import React from 'react';
import {Link} from 'react-router-dom'
import {
  Form, Icon, Input, Button, Checkbox,Table,Divider,Row, Col, message, Popconfirm
} from 'antd';

import SideBar from '../../../components/siderBar/sideBar';
import Header from '../../../components/header/header';
import axios from 'axios';
import "./userMan.css";
const Api = require('../../../config/config');

class UserMan extends React.Component {

  state = {
    departments:[],
    data:[],
    pageSize:10
  }

  componentDidMount(){
    this.getUsers()
  }

  getUsers = (data) =>{
    let token = window.localStorage.getItem("token")
    let _this = this;
    axios({
      method: "GET",
      url: `${Api.HOST}/api/users`,
      params: data||{},
      headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + token
      }}).then(function(res) {
        console.log(res);
        if(res.data.code===0){
         
          _this.setState({
            count: res.data.data.count,
            data: res.data.data.rows,
            pageSize:res.data.pageSize
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
      values.name = values.name?values.name.replace(/(^\s*)|(\s*$)/g, ""):values.name
      this.getUsers(values)
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  deleteUser = (id) => {
    const token = window.localStorage.getItem("token");
    const _this = this;
    axios({
      method: "DELETE",
      url: `${Api.HOST}/api/users/${id}`,
      data: {},
      headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+ token
      }}).then(function(res) {
        console.log(res);
        if(res.data.code===0){
          _this.getUsers()
          message.success('删除成功！');
        } else {
          message.error('删除失败！');
        }
         
      });
  }

  confirm = (id)=> {
    this.deleteUser(id)
  }
  
  cancel = (e)=>{
    console.log(e);
  }



  render() {
    const { data, pageSize } = this.state;
    const columns = [{
      title: '用户名',
      dataIndex: 'username',
      width: 150,
    }, {
        title: '昵称',
        dataIndex: 'nickName',
        width: 150,
    }, {
        title: '头像',
        dataIndex: 'avatarUrl',
        width: 150,
        render: (text, record)=>(
          <div>
            <img style={{width:'60px'}}  src={record.avatarUrl} />
          </div>
        )
    }, {
      title: '余额',
      dataIndex: 'money',
      width: 150,
    }, {
      title: '管理员权限',
      dataIndex: 'authority_id',
      render: (text, record) => (
        <div>
         {record.authority.name}
        </div>
      )
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          {/* <Link to={'/admin/member/detail/' + record.id}>查看{record.username}简历</Link>
          <Divider type="vertical" /> */}
          <Link to={'/admin/user/edit/' + record.id}>编辑</Link>
          <Divider type="vertical" />
          <Popconfirm title="你要删除吗?" onConfirm={(e)=>this.confirm(record.id)} onCancel={(e)=>this.cancel(e)} okText="Yes" cancelText="No">
            <a href="javascript;;">删除</a>
          </Popconfirm>
        </span>
      )
    }];
    
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="admin">
        <Header/>
        <div className="admin-down">
          <SideBar {...this.props} cur="userMan"/>
          <div className="userMan">
          <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
          >
            <Row gutter={24}>
              <Col span={12} >
                <Form.Item label='姓名'>
                  {getFieldDecorator('username', {
                    rules: [{
                      message: '请输入姓名', whitespace: true 
                    }],
                  })(
                    <Input placeholder="请输入姓名" />
                  )}
                </Form.Item>
              </Col>

              {/* <Col span={12} >
                <Form.Item label='微信昵称'>
                  {getFieldDecorator('nickName', {
                    rules: [{
                      message: '请输入微信昵称!',
                    }],
                  })(
                    <Input placeholder="请输入微信昵称" />
                  )}
                </Form.Item>
              </Col> */}
                 
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right',paddingBottom:'20px' }}>
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
              pagination={{ pageSize}}
              scroll={{ y: 350 }} />
          </div>
        </div>
      </div>
      
    );
  }
}
const WrappedUserManForm = Form.create({ name: 'advanced_search' })(UserMan);
export default WrappedUserManForm