import React from 'react';
import {NavLink} from 'react-router-dom'

import {
  Menu, Icon, Button 
} from 'antd';

import "./sideBar.css"
const SubMenu = Menu.SubMenu;

class SideBar extends React.Component {
  state = {
    collapsed: false,
  }

  handleClick = (e) => {
    console.log('click ', e);
  }

  render() {
    const {cur} = this.props;
    let defaultSelectedKeys = [];
    if(cur==="memberSearch"){
      defaultSelectedKeys = ['1']
    } else if (cur ==="userMan"){
      defaultSelectedKeys = ['2']
    } else if (cur ==="userAdd"){
      defaultSelectedKeys = ['3']
    } else if (cur ==="orderMan"){
      defaultSelectedKeys = ['4']
    } else if (cur ==="orderAdd"){
      defaultSelectedKeys = ['5']
    } else if (cur === "productMan") {
      defaultSelectedKeys = ['6']
    } else if (cur === "productAdd") {
      defaultSelectedKeys = ['7']
    } else if(cur ==="noticeMan"){
      defaultSelectedKeys = ['8']
    } else if (cur === "noticeAdd") {
      defaultSelectedKeys = ['9']
    }
    console.log("defaultSelectedKeys",defaultSelectedKeys)
    return (
      <div className="sideBar">
      <div style={{ width: 256 }}>
      
        <Menu
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={['sub1','sub2','sub3','sub4']}
          onClick={this.handleClick}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          {/* <Menu.Item key="1">
            <NavLink to="/admin/member/search" >
              <Icon type="pie-chart" />
              <span>员工查询</span>
            </NavLink>
          </Menu.Item>
           */}
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>用户管理</span></span>}>
         
            <Menu.Item key="2">
              <NavLink to="/admin/user/manage">
                用户管理
              </NavLink>
            </Menu.Item>

            <Menu.Item key="3">
              <NavLink to="/admin/user/add">
                添加用户
              </NavLink>
            </Menu.Item>

          </SubMenu>

          <SubMenu key="sub2" title={<span><Icon type="mail" /><span>订单管理</span></span>}>

            <Menu.Item key="4">
              <NavLink to="/admin/order/manage">
                订单管理
              </NavLink>
            </Menu.Item>

            {/* <Menu.Item key="5">
              <NavLink to="/admin/order/add" >
                添加部门
              </NavLink>  /admin/product/manage
            </Menu.Item> */}
          </SubMenu>

          <SubMenu key="sub3" title={<span><Icon type="mail" /><span>商品管理</span></span>}>

              <Menu.Item key="6">
                <NavLink to="/admin/product/manage">
                  商品管理
                </NavLink>
              </Menu.Item>

              <Menu.Item key="7">
                <NavLink to="/admin/product/add" >
                  添加商品
                </NavLink> 
            </Menu.Item>
          </SubMenu>

            <SubMenu key="sub4" title={<span><Icon type="mail" /><span>公告管理</span></span>}>

              <Menu.Item key="8">
                <NavLink to="/admin/notice/manage">
                  公告管理
                </NavLink>
              </Menu.Item>

              <Menu.Item key="9">
                <NavLink to="/admin/notice/add" >
                  添加公告
                </NavLink>
              </Menu.Item>
            </SubMenu>         
        </Menu>
      </div>
      </div>
    );
  }
}
export default SideBar