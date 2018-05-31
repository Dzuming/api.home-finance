'use strict';
module.exports = (sequelize, DataTypes) => {
  var AssumptionTypeCategory = sequelize.define(
    'AssumptionTypeCategory',
    {
      assumptionTypeId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      period: DataTypes.STRING,
    },
    {},
  );
  AssumptionTypeCategory.associate = function(models) {
    // associations can be defined here
  };
  return AssumptionTypeCategory;
};
