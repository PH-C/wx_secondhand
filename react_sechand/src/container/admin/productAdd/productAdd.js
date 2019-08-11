import React from 'react';

import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, message, Upload, Modal
} from 'antd';

import SideBar from '../../../components/siderBar/sideBar';
import Header from '../../../components/header/header';
import axios from 'axios';
import "./productAdd.css";
const { Option } = Select;
const { TextArea } = Input;
const Api = require('../../../config/config');

class ProductAdd extends React.Component {
  state = {
    confirmDirty: false,
    departments: [],
    data: {},
    action: "add",
    previewVisible: false,
    previewImage: '',
    fileList: [],
    show: false
  }

  componentDidMount() {
    const { path, params } = this.props.match
    if (path === "/admin/product/edit/:id") {
      this.getProduct(params.id)
    }
    // this.getDepartment()
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })


  getProduct = (id) => {
    let token = window.localStorage.getItem("token")
    let _this = this;
    // const { setFields } = this.props.form;
    axios({
      method: "GET",
      url: `${Api.HOST}/api/product/${id}`,
      params: {},
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(function (res) {
      console.log(res);
      if (res.data.code === 0) {
        let fileList=[]
        const data = { ...res.data.data }
        data.price=data.price+""
        let pics = data.pic.split(",")
        for (let i = 0; i < pics.length;i++){
          fileList.push({
            uid: i,
            name: pics[i],
            status: 'done',
            url: `${Api.HOST}/public${pics[i]}`
          })
        }
        _this.setState({
          data: data,
          fileList: fileList,
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
        message.error('获取失败！');
      }

    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");
    const { path, params } = this.props.match
    const { fileList } = this.state;
    let pics = []

    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log("values", values)
      if (!err && fileList.length) {
        console.log('Received values of form: ', values);
        for(let i=0;i<fileList.length;i++){
          let item = fileList[i].response ? fileList[i].response.data.url : fileList[i].name
          pics.push(item)
        }
        values.pic = pics.join(",");
        if (path === "/admin/product/edit/:id") {
          this.putProduct(params.id, values)
        } else {
          this.postProduct(values)
        }
      }
    });
  }

  postProduct(values) {
    const token = window.localStorage.getItem("token");
    axios({
      method: "POST",
      url: `${Api.HOST}/api/product`,
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

  putProduct(id, values) {
    const token = window.localStorage.getItem("token");
    axios({
      method: "PUT",
      url: `${Api.HOST}/api/users/product/${id}`,
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

  onChangeMode = (value)=>{
    let show = value =="在线交易"?true:false
    this.setState({
      show
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const { show } = this.state;
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
        <Header />
        <div className="admin-down">
          <SideBar {...this.props} cur="productAdd" />
          <div className="ProductAdd">
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

              <Form.Item
                label={(
                  <span>
                    闲置类型
                </span>
                )}
              >
                {getFieldDecorator('type', {
                  rules: [{ required: true, message: '请选择类型!', whitespace: false }],
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择类型"
                    optionFilterProp="children"

                  >
                    <Option value="服饰">服饰</Option>
                    <Option value="数码">数码</Option>
                    <Option value="手机">手机</Option>
                    <Option value="书籍">书籍</Option>
                    <Option value="食品">食品</Option>
                    <Option value="生活用品">生活用品</Option>
                    <Option value="其他">其他</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item
                label={(
                  <span>
                    闲置名称
                  </span>
                )}
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入闲置名称!', whitespace: true }],
                })(
                  <Input />
                )}
              </Form.Item>

              <Form.Item
                label={(
                  <span>
                    价格
                </span>
                )}
              >
                {getFieldDecorator('price', {
                  rules: [{ required: true, message: '请输入价格!', whitespace: true }],
                })(
                  <Input />
                )}
              </Form.Item>

              <Form.Item
                label="联系方式"
              >
                {getFieldDecorator('mobile', {
                  rules: [{ required: true, message: '请输入电话!' }],
                })(
                  <Input  style={{ width: '100%' }} />
                )}
              </Form.Item>

              <Form.Item
                label={(
                  <span>
                    交易方式
                </span>
                )}
              >
                {getFieldDecorator('transactionMode', {
                  rules: [{ required: true, message: '请选择交易方式!', whitespace: false }],
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择交易方式"
                    optionFilterProp="children"
                    onChange={this.onChangeMode}
                  >
                    <Option value="见面交易">见面交易</Option>
                    <Option value="在线交易">在线交易</Option>
                  </Select>
                )}
              </Form.Item>
              {
                show?
                <Form.Item
                  label="邮费"
                >
                  {getFieldDecorator('postage', {
                    rules: [{ required: true, message: '请输入邮费!' }],
                  })(
                    <Input style={{ width: '100%' }} />
                  )}
                </Form.Item>:null
              }
              <Form.Item
                label={(
                  <span>
                    商品详情
                  </span>
                )}
              >
                {getFieldDecorator('describe', {
                  rules: [{ required: true, message: '请输入商品详情!', whitespace: true }],
                })(
                  <TextArea placeholder="请输入商品详情!" autosize={{ minRows: 2, maxRows: 6 }} />
                )}
              </Form.Item>

              <Form.Item
                label={(
                  <span>
                    商品图片（最多四张）
                </span>
                )}
              >

                <div className="clearfix">
                  <Upload
                    action={`${Api.HOST}/api/upload`}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 4 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>


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
const WrappedProductAddForm = Form.create({ name: 'Product-add' })(ProductAdd);
export default WrappedProductAddForm