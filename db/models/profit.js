'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profit = sequelize.define('Profit', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Profit.associate = function (models) {
    Profit.belongsTo(models.Category, {as: 'category'});
  };
  return Profit;
};