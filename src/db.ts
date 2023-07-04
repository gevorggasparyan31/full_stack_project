import { createConnection } from 'mysql2/promise';

export const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ankap3101',
  database: 'Homework',
  port: 3306,
});
