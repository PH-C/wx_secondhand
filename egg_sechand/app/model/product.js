'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    TEXT,
    DATE,
    BOOLEAN,
    FLOAT,
  } = app.Sequelize;

  const Product = app.model.define('product', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      validate: {
        min: 1,
        max: 50,
      },
    },
    size:{
      type: STRING, 
    },
    parameters:{
      type: STRING, 
    },
    price:{
      type: FLOAT,
      defaultValue: 0,
    },
    sku:{
      type: INTEGER,
      defaultValue: 1,
    },
    pic: {
      type: STRING,
    },
    articleNumber:{
      type: STRING,
      validate: {
        min: 1,
        max: 255,
      },
    },
    describe: {
      type: TEXT,
    },
    type:{
      type: STRING,
      validate: {
        min: 1,
        max: 255,
      },
    },
    transactionMode:{
      type: STRING,
    },
    postage:{
      type: FLOAT,
      defaultValue: 0,
    },
    mobile:{
      type: STRING,
    },
    readSize: {
      type: INTEGER,
      defaultValue: 0,
    },
    isHot: {
      type: BOOLEAN,
      allowNull: false, 
      defaultValue: false
    },
    isRecommend: {
      type: INTEGER,
      defaultValue: 0,
    },
    tags: {
      type: STRING(100),
    },
    sellState:{
      type: INTEGER,
      allowNull: false, 
      defaultValue: 0
    },
    created_at: DATE,
    updated_at: DATE,

  });

  Product.associate = function() {
    app.model.Product.belongsTo(app.model.User);
    // app.model.Product.belongsTo(app.model.UserOrder);
    // app.model.Product.hasMany(app.model.UserOrder, {
    //   as: 'orders',
    // });
    app.model.Product.hasMany(app.model.Collect, {
      as: 'collects',
    });
    app.model.Product.hasMany(app.model.Comment, {
      as: 'comments',
    });
  };

 
  return Product;
};
