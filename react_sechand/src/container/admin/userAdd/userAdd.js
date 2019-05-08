import React from 'react';

import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button,message,Upload, Modal
} from 'antd';

import SideBar from '../../../components/siderBar/sideBar';
import Header from '../../../components/header/header';
import axios from 'axios';
import "./userAdd.css";
const Api = require('../../../config/config');

const { Option } = Select;
const { TextArea } = Input;

class UserAdd extends React.Component {
  state = {
    confirmDirty: false,
    authorities:[],
    data:{},
    action:"add",
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  componentDidMount(){
    const { path, params} = this.props.match
    if(path==="/admin/user/edit/:id"){
      this.getUser(params.id)
    }
    this.getAuthority()
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })


  getUser = (id) => {
    let token = window.localStorage.getItem("token")
    let _this = this;
    // const { setFields } = this.props.form;
    axios({
      method: "GET",
      url: `${Api.HOST}/api/users/${id}`,
      params: {},
      headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + token
      }}).then(function(res) {
        console.log(res);
        if(res.data.code===0){
          const data = res.data.data
          data.authority_id = data.authority_id+""
          _this.setState({
            data: data,       
            action: "edit"
          },()=>{
            for(let key in data){
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

  getAuthority = ()=>{
    let token = window.localStorage.getItem("token")
    let _this = this;
    axios({
      method: "GET",
      url: `${Api.HOST}/api/authority`,
      data: {},
      headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer ' + token
      }}).then(function(res) {
        console.log(res);
        if(res.data.code===0){
         
          _this.setState({
            authorities: res.data.data.rows
          })

        } else {
          message.error('登录失败！');
        }
         
      });
  }



  handleSubmit = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    const { path, params} = this.props.match
    const { fileList } = this.state;

    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log("values", values)
      if (!err) {
        console.log('Received values of form: ', values);
        if(path==="/admin/user/edit/:id"){
          values.authority_id = values.authority_id + ""
          this.putUser(params.id, values)
        } else {
          values.authority_id = Number(values.authority_id)
          this.postUser(values)
        }
      }
      

    });
  }

  postUser(values){
    const token = window.localStorage.getItem("token");
    axios({
      method: "POST",
      url: `${Api.HOST}/api/users/register`,
      data: values,
      headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+ token
      }}).then(function(res) {
        console.log(res);
        if(res.data.code===0){
          message.success('添加成功！');
        } else {
          message.error('添加失败！');
        }
         
      });
  }

  putUser(id, values){
    const token = window.localStorage.getItem("token");
    axios({
      method: "PUT",
      url: `${Api.HOST}/api/users/${id}`,
      data: values,
      headers: {
          'Content-Type': 'application/json',
          'Authorization':'Bearer '+ token
      }}).then(function(res) {
        console.log(res);
        if(res.data.code===0){
          message.success('修改成功！');
        } else {
          message.error('修改失败！');
        }
         
      });
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const { authorities } = this.state;
    const { previewVisible, previewImage, fileList } = this.state;
    console.log("fileList", previewVisible, previewImage, fileList)
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
        <Header/>
        <div className="admin-down">
          <SideBar {...this.props} cur="userAdd"/>
          <div className="userAdd">
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

            <Form.Item
              label={(
                <span>
                  用户名               
                </span>
              )}
            >
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入员工的真实姓名!', whitespace: true }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item
              label={(
                <span>
                  密码
                </span>
              )}
            >
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!', whitespace: true }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item
              label={(
                <span>
                  权限
                </span>
              )}
            >
              {getFieldDecorator('authority_id', {
                rules: [{ required: true, message: '请输入员工的所属部门!', whitespace: true }],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择权限"
                  optionFilterProp="children"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                {
                  authorities.length?authorities.map((item)=>(
                    <Option key={item.id} value={item.id+""} >{item.name}</Option>
                  )):null
                }
                </Select>
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
const WrappedUserAddForm = Form.create({ name: 'User-add' })(UserAdd);
export default WrappedUserAddForm