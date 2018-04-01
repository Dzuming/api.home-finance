'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profit = sequelize.define('Profit', {
    description: DataTypes.STRING,
    value: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    period: DataTypes.STRING
  }, {});
  Profit.associate = function (models) {
    Profit.belongsTo(models.Category, {as: 'category'});
  };
  return Profit;
};