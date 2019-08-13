# wx_secondhand_mall
# 微信小程序 校园闲置商城
**项目地址**：[https://github.com/PH-C/wx_secondhand](https://github.com/PH-C/wx_secondhand)(喜欢的请点个star^_^)
这个项目是一个简单的校园闲置二手商城微信小程序含以下功能：商品列表与搜索、商品收藏分享、商品下单、发布闲置、我的订单、我的地址管理、我的收藏、我的闲置、系统公告、钱包充值、登陆注册等功能，基于react技术栈开发的简单商城后台系统提供用户管理、商品管理、订单管理、公告管理等功能。项目中有个后端服务，即项目中的egg_second，该后端使用nodejs框架egg开发restful风格的数据接口，采用mysql作为数据库，使用sequelize 这个ORM 框架来定义数据表模型，以及对数据库进行crud操作。
# 技术栈
- react
- react-router
- axois
- nodejs
- eggjs
- mysql
- sequelize
# 项目node后端运行方法

-``` bash
#1
git clone https://github.com/PH-C/wx_secondhand.git

#2 
cd egg_second
npm install

#3
修改config.default.js中sequelize的配置
mysql的账号密码改为自己的

#4
npm run dev
# 项目react后台管理系统运行方法

-``` bash
#1
git clone https://github.com/PH-C/wx_secondhand.git

#2 
cd react_second
npm install

#3
npm run start

![enter image description here](https://github.com/PH-C/wx_secondhand/blob/master/prtsc/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20190814002508.png)
![enter image description here](https://github.com/PH-C/wx_secondhand/blob/master/prtsc/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20190814003140.png)
![enter image description here](https://github.com/PH-C/wx_secondhand/blob/master/prtsc/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20190814003301.png)
![enter image description here](https://github.com/PH-C/wx_secondhand/blob/master/prtsc/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20190814003449.png)


