'use strict';
module.exports = (sequelize, DataTypes) => {
  var Spending = sequelize.define('Spending', {
    description: DataTypes.STRING,
    value: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    period: DataTypes.STRING
  }, {});
  Spending.associate = function(models) {
    // associations can be defined here
  };
  return Spending;
};