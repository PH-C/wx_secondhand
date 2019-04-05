'use strict';

module.exports = app => {
  app.post('/api/users/comment',app.jwt, 'comment.create');
  app.del('/api/users/comment/:id', app.jwt,'comment.destroy');
};
