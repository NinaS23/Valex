import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;

const user = 'postgres';
const password = process.env.DB_PASSWORD;
const host = 'localhost';
const port = 5432;
const database = 'valex';

export const connection = new Pool({
  user,
  password,
  host,
  port,
  database
});
