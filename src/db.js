import mysql from 'mysql';

export default () => (
  mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'home-finance'
  })
)



