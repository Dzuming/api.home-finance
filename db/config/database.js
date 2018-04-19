require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    charset: 'utf8',
  },
  test: {
    username: 'root',
    password: null,
    database: 'finance-home-test',
    host: '127.0.0.1',
    dialect: 'mysql',
    charset: 'utf8',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    charset: 'utf8',
  },
};
