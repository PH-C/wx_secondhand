'use strict';

module.exports = app => {
  app.post('/api/address',  app.jwt,'address.create');
  app.get('/api/address', 'address.list');
  app.del('/api/address/:id', app.jwt, 'address.destroy');
  app.get('/api/address/:id', app.jwt, 'address.find');
  app.put('/api/address/:id',  app.jwt, 'address.update');
  app.get('/api/users/address', app.jwt,'address.currentUserAddresslist')
};
