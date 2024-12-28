import db from './queries.js';
import dotenv from 'dotenv';
dotenv.config();

// Exports to setup.js
export const populateRoles = async () => {
  let success = true;

  const roles = [
    { role: 'admin', password: process.env.ADMIN_PASSWORD },
    { role: 'member', password: process.env.MEMBER_PASSWORD },
  ];

  for (const role of roles) {
    await db.addRole(role);
    console.log(`Added role: ${role.role}`);
    try {
    } catch (error) {
      success = false;
      console.error(`Error adding role ${role.role}:`, error);
    }
  }

  return success;
};
