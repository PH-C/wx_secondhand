'use strict';

module.exports = app => {
  app.get('/api/notice', 'notice.list');
  // app.get('/api/notice/banner', 'notice.banner');
  app.post('/api/notice', app.jwt, 'notice.create');
  app.get('/api/notice/:id', 'notice.find');

  app.del('/api/notice/:id', app.jwt, 'notice.destroy');
  app.put('/api/notice/:id', app.jwt, 'notice.update');

};
