import pool from './pool.js';
import bcrypt from 'bcryptjs';

const addRole = async (role) => {
  const hashedPassword = await bcrypt.hash(role.password, 10);
  try {
    await pool.query(
      `
      INSERT INTO role_passwords
      (role, hashed_password)
      VALUES ($1, $2)`,
      [role.role, hashedPassword]
    );
  } catch (error) {
    throw error;
  }
};

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

const addMessage = async (user, message) => {
  try {
    await pool.query(
      `INSERT INTO messages (title, content, user_id)
      VALUES ($1, $2, $3)`,
      [message.title, message.content, user.id]
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

const modifyRole = async (user, password, role) => {
  const { rows } = await pool.query(
    `
    SELECT hashed_password
    FROM role_passwords
    WHERE role = $1`,
    [role]
  );
  const rolePassword = rows[0]['hashed_password'];

  let success = false;
  const isMatch = await bcrypt.compare(password, rolePassword);

  if (isMatch === false) {
    return success;
  }
  await pool.query(
    `
    UPDATE users
    SET is_member = true,
       is_admin = CASE WHEN $1 = 'admin' THEN true ELSE is_admin END
    WHERE username = $2
    `,
    [role, user.username]
  );

  success = true;
  return success;
};

const db = { addMessage, addRole, addUser, getMessages, modifyRole };

export default db;
