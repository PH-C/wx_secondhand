'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;

  const CommentReply = app.model.define('commentreply', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: STRING,
    },
    created_at: DATE,
    updated_at: DATE,
  });

  CommentReply.associate = function() {
    app.model.CommentReply.belongsTo(app.model.Comment);
    app.model.CommentReply.belongsTo(app.model.User);
  };

  return CommentReply;
};
