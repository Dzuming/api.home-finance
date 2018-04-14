const config = require('../../src/config');

module.exports = {
  development: {
    username: 'root',
    password: 'null',
    database: 'home-finance',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'finance-home-test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: config.db.user,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    dialect: 'mysql',
  }
};