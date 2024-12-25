import pool from './pool.js';
import bcrypt from 'bcryptjs';

const addUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  try {
    await pool.query(
      `INSERT INTO users
    (first_name, last_name, username, password)
    VALUES ($1, $2, $3, $4)`,
      [data.firstName, data.lastName, data.username, hashedPassword]
    );
  } catch (error) {
    throw error;
  }
};

const db = { addUser };

export default db;
