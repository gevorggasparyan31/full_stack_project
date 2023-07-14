import { createConnection } from 'mysql2/promise';

export const db = createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'Homework',
  port: 3306,
});
