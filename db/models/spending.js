'use strict';
module.exports = (sequelize, DataTypes) => {
  var Spending = sequelize.define('Spending', {
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
  Spending.associate = function (models) {
    Spending.belongsTo(models.Category, {as: 'category'});
  };
  return Spending;
};