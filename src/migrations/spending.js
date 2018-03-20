import db from '../db';
import Sequelize from 'sequelize';

const Spending = db.define('spendings', {
  value: Sequelize.INTEGER,
  description: Sequelize.STRING
});

// force: true will drop the table if it already exists
Spending.sync({force: true}).then(() => {
  // Table created
  return Spending.create({
    value: 23,
    description: 'Hancock'
  });
});