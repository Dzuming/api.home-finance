'use strict';
module.exports = (sequelize, DataTypes) => {
  var AssumptionType = sequelize.define(
    'AssumptionType',
    {
      name: DataTypes.STRING,
    },
    {},
  );
  AssumptionType.associate = function(models) {
    // associations can be defined here
  };
  return AssumptionType;
};
