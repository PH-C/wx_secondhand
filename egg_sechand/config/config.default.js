'use strict';
// const sqlConfig = require('../config');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1520690141955_3949';

  // add your config here
  config.middleware = [ 'errorHandler' ]

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    // dialectOptions: {
    //   charset: 'utf8mb4',
    // },
    database: 'egg_sechand',
    host: '127.0.0.1',
    port: '3306',
    username: 'root',
    password: '123',
    timezone: '+08:00',
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:3000' ],
  };

  config.cors = {
    credentials: true,
  };

  config.jwt = {
    secret: 'Great4-M',
    enable: true, // default is false
    match: '/jwt', // optional
  }



  // config.alinode = {
  //   enable: true,
  //   appid: '78367',
  //   secret: '4ba609a5e26d28a23d3b94d40a7263fe72efa289',
  // };

  return config;
};
