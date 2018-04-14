const db = require('../../src/config').db;

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
    username: db.user,
    password: db.password,
    database: db.database,
    host: db.host,
    dialect: 'mysql',
  }
};