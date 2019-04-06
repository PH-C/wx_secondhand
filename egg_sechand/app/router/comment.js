'use strict';

module.exports = app => {
  app.post('/api/users/comment',app.jwt, 'comment.create');
  app.post('/api/users/comment/reply',app.jwt, 'comment.commentReplyCreate');
  app.del('/api/users/comment/:id', app.jwt,'comment.destroy');
};
