import Sequelize from 'sequelize';
import db from './config';

const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
export default sequelize;



