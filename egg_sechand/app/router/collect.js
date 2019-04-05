'use strict';

module.exports = app => {
  app.post('/api/collect', app.jwt,'collect.create');
  app.post('/api/uncollect', app.jwt,'collect.uncollect');
  app.get('/api/collect', 'collect.list');
  app.del('/api/collect/:id', app.jwt,'collect.destroy');
  app.get('/api/collect/:id', app.jwt,'collect.find');
  app.put('/api/collect/:id', app.jwt,'collect.update');
  app.get('/api/users/collect', app.jwt,'collect.currentUserCollectlist')
};
