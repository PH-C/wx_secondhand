'use strict';

module.exports = app => {
  app.get('/api/userorder',app.jwt, 'userOrder.index');
  app.post('/api/userorder', app.jwt,'userOrder.create');
  app.get('/api/userorder/:id', app.jwt,'userOrder.find');
  app.get('/api/userorder/:id/edit',app.jwt, 'userOrder.edit');

  app.get('/api/users/userorder', app.jwt,'userOrder.findCurrentUserOrder');
  app.get('/api/users/sellerorder', app.jwt,'userOrder.findCurrentUserSellOrder');

  app.del('/api/users/userorder/:id', app.jwt,'userOrder.destroy');
  app.put('/api/users/userorder/:id', app.jwt,'userOrder.update');
  
};
