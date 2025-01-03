import dotenv from 'dotenv';
import client from './client.js';
import pkg from 'pg';
import { populateUsers } from './populate-users.js';
import { populateRoles } from './populate-roles.js';
import {
  createUsersTable,
  createMessagesTable,
  createRoles,
  insertMessages,
} from './schema.js';

dotenv.config();

const { Client } = pkg;

const setupDatabase = async () => {
  const inProduction = process.env.NODE_ENV === 'production';
  let currentClient = client;

  try {
    await currentClient.connect();

    // Create databse if in development
    if (inProduction === false) {
      try {
        await currentClient.query('CREATE DATABASE clubhouse');
        console.log('Database created successfully');
      } catch (error) {
        if (error.code === '42P04') {
          console.log('Database already exists');
        } else {
          throw error;
        }
      }
    }

    // Disconnect from default db and connect to clubhouse
    await currentClient.end();

    // Connect to new database
    currentClient = new Client({
      connectionString: inProduction
        ? process.env.DATABASE_URL
        : process.env.LOCAL_DB_URL + '/clubhouse',
      ssl: inProduction ? { rejectUnauthorized: false } : false,
    });

    await currentClient.connect();

    console.log('Creating tables...');
    await currentClient.query(createUsersTable);
    await currentClient.query(createMessagesTable);
    await currentClient.query(createRoles);

    console.log('Populating  tables...');
    console.log('Populating users table...');
    const populatedUsers = await populateUsers();

    if (populatedUsers === true) {
      await currentClient.query(insertMessages);
    } else {
      console.log('Warning: Some users failed to populate');
    }

    console.log('Populating roles table...');
    const populatedRoles = await populateRoles();
    if (populatedRoles === true) {
      console.log('Database setup completed successfully');
    } else {
      console.log('Warning: Failed to populate roles');
    }
  } catch (error) {
    console.error('Error during DB creation or population', error);
  } finally {
    await currentClient.end();
    console.log('done');
  }
};

setupDatabase();
