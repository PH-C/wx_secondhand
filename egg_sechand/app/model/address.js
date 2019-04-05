'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;
  const Address = app.model.define('address', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    realName:{
      type: STRING
    },
    mobile:{
      type:STRING
    },
    address:{
      type:STRING
    },
    created_at: DATE,
    updated_at: DATE,
  });

  Address.associate = function() {
    app.model.Address.belongsTo(app.model.User);
  };

  return Address;
};