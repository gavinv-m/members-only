import pool from './pool.js';
import bcrypt from 'bcryptjs';

const addUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  try {
    await pool.query(
      `INSERT INTO users
    (first_name, last_name, username, password, is_member, is_admin)
    VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        data.firstName,
        data.lastName,
        data.username,
        hashedPassword,
        data.isMember || false,
        data.isAdmin || false,
      ]
    );
  } catch (error) {
    throw error;
  }
};

const getMessages = async () => {
  const { rows } = await pool.query(`
    SELECT messages.*, users.first_name, users.last_name, users.username
    FROM messages
    JOIN users ON messages.user_id = users.id
  `);
  return rows;
};

const db = { addUser, getMessages };

export default db;
