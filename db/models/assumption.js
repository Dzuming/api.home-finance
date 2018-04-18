'use strict';
module.exports = (sequelize, DataTypes) => {
  var Assumption = sequelize.define(
    'Assumption',
    {
      user_id: DataTypes.INTEGER,
      assumption_type_id: DataTypes.INTEGER,
      percentage: DataTypes.INTEGER,
      is_initial_value: DataTypes.BOOLEAN,
      period: DataTypes.STRING,
    },
    {},
  );
  Assumption.associate = function(models) {
    // associations can be defined here
  };
  return Assumption;
};
