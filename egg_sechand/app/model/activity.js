'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    TEXT,
    DATE,
  } = app.Sequelize;

  const Activity = app.model.define('activity', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING,
      validate: {
        min: 2,
        max: 50,
      },
    },
    pic: {
      type: STRING,
    },
    content: {
      type: TEXT,
    },
    readSize: {
      type: INTEGER,
      defaultValue: 0,
    },
    commentSize: {
      type: INTEGER,
      defaultValue: 0,
    },
    tags: {
      type: STRING(100),
    },
    created_at: DATE,
    updated_at: DATE,

  });

  return Activity;
};
