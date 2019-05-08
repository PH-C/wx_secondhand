import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import Login from './container/login/login';
import Register from './container/register/register';
import UserMan from './container/admin/userMan/userMan';
import UserAdd from './container/admin/userAdd/userAdd';

import OrderMan from './container/admin/orderMan/orderMan';

import ProductMan from './container/admin/productMan/productMan';
import ProductAdd from './container/admin/productAdd/productAdd';

import NoticeMan from './container/admin/noticeMan/noticeMan';
import NoticeAdd from './container/admin/noticeAdd/noticeAdd';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import "./App.css"
import "antd/dist/antd.css";

class App extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="app" >
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        {/* <Route exact path='/register' component={ Register } /> */}
                        <Route exact path='/admin/user/manage' component={UserMan} />
                        <Route exact path='/admin/user/add' component={UserAdd} />
                        <Route exact path='/admin/user/edit/:id' component={UserAdd} />
                        <Route exact path='/admin/order/manage' component={OrderMan} />

                        <Route exact path='/admin/product/manage' component={ProductMan} />
                        <Route exact path='/admin/product/add' component={ProductAdd} />
                        <Route exact path='/admin/product/edit/:id' component={ProductAdd} />
                        <Route exact path='/admin/notice/manage' component={NoticeMan} />
                        <Route exact path='/admin/notice/add' component={NoticeAdd} />
                        <Route exact path='/admin/notice/edit/:id' component={NoticeAdd} />

                    </Switch>

                </BrowserRouter>
            </div>
        );
    }
}

export default App
