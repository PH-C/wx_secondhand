'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;
  const Attachment = app.model.define('attachment', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    extname: STRING,
    url: STRING,
    filename: STRING,
    extra: STRING,
    created_at: DATE,
    updated_at: DATE,
  });

  return Attachment;
};
