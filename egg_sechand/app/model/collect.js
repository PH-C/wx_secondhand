'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;
  const Collect = app.model.define('collect', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: DATE,
    updated_at: DATE,
  });

  Collect.associate = function() {
    app.model.Collect.belongsTo(app.model.User);
    app.model.Collect.belongsTo(app.model.Product);
  };

  return Collect;
};
