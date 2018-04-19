'use strict';
module.exports = (sequelize, DataTypes) => {
  var Assumption = sequelize.define(
    'Assumption',
    {
      userId: DataTypes.INTEGER,
      assumptionTypeId: DataTypes.INTEGER,
      percentage: DataTypes.INTEGER,
      isInitialValue: DataTypes.BOOLEAN,
      period: DataTypes.STRING,
    },
    {},
  );
  Assumption.associate = function(models) {
    Assumption.belongsTo(models.AssumptionType, {
      foreignKey: 'assumptionTypeId',
    });
  };
  return Assumption;
};
