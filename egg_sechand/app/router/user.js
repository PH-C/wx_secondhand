'use strict';

module.exports = app => {
  // const { router, controller } = app

  app.post('/api/users/register', 'user.create');
  app.post('/api/users/login', 'user.login');
  app.del('/api/users/:id', app.jwt,'user.destroy');
  app.put('/api/users/recharge', app.jwt,'user.recharge');
  app.put('/api/users/pay', app.jwt,'user.pay');
  app.put('/api/users/current', app.jwt,'user.updateLoginUser');
  app.put('/api/users/:id', 'user.update');
 
  app.post('/api/users/adminlogin','user.adminLogin')
  app.get('/api/users/current',app.jwt,'user.current')
  app.get('/api/users/:id', 'user.find');
 
  app.get('/api/users/:id/edit', 'user.find');
};
