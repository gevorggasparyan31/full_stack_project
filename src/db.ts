import { createConnection } from 'mysql2/promise';
require('dotenv').config();

export const db = createConnection({
  host: 'DB_HOST',
  user: 'DB_USER',
  password: 'DB_PASSWORD',
  database: 'Homework',
  port: 3306,
});
