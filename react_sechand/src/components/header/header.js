import React from 'react';

import {
  Menu, Icon, Button 
} from 'antd';

import "./header.css"

class Header extends React.Component {
  state = {
    collapsed: false,
  }

  loginOut = (e)=>{
    window.localStorage.setItem("token","")
    window.location="/"
  }


  render() {
    const user = JSON.parse(window.localStorage.getItem("user"))
    return (
      <div className="header">
        <h1>校园闲置商城后台管理系统</h1>
        <div className="person">{user.username} | <a onClick={(e)=>this.loginOut(e)}>退出</a></div>
      </div>
    );
  }
}
export default Header