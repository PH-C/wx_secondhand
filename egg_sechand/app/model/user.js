'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
    FLOAT,
  } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: STRING,
    },
    password: {
      type: STRING,
    },
    avatarUrl: {
      type: STRING, 
    },
    nickName:{
      type: STRING, 
    },
    mobile:{
      type: STRING, 
    },
    email:{
      type: STRING, 
    },
    money: {
      type: FLOAT,
      allowNull: false, 
      defaultValue: 0
    },
    created_at: DATE,
    updated_at: DATE,
  });

  User.associate = function() {
    app.model.User.hasMany(app.model.Comment, {
      as: 'comments',
    });
    app.model.User.hasMany(app.model.Product, {
      as: 'products',
    });
    app.model.User.hasMany(app.model.Collect, {
      as: 'collects',
    });
    app.model.User.hasMany(app.model.Address, {
      as: 'address',
    });
    app.model.User.hasMany(app.model.UserOrder, {
      as: 'userorders',
    });
    app.model.User.belongsTo(app.model.Authority);
  };

  return User;
};
