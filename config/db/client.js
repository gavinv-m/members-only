import dotenv from 'dotenv';
import pkg from 'pg';
dotenv.config();

const { Client } = pkg;
const client = new Client({
  connectionString: process.env.LOCAL_DB_URL,
  ssl: false,
});

export default client;
