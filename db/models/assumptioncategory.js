'use strict';
module.exports = (sequelize, DataTypes) => {
  var AssumptionCategory = sequelize.define(
    'AssumptionCategory',
    {
      assumptionId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {},
  );
  AssumptionCategory.associate = function(models) {
    // associations can be defined here
  };
  return AssumptionCategory;
};
