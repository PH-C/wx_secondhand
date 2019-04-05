'use strict';

module.exports = app => {
  app.get('/api/product', 'product.index');
  app.get('/api/product/banner', 'product.banner');
  
  app.post('/api/product', app.jwt,'product.create');
  app.get('/api/product/:id','product.find');
  app.get('/api/product/:id/edit', 'product.edit');
  app.get('/api/users/product/sell', app.jwt,'product.findCurrentSell');
  app.get('/api/users/product/:id', app.jwt,'product.findWithToken');
  app.del('/api/users/product/:id',app.jwt, 'product.destroy');
  app.put('/api/users/product/:id', app.jwt,'product.update');
  
};
