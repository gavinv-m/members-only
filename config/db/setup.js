import dotenv from 'dotenv';
import client from './client.js';
import pkg from 'pg';
import {
  createUsersTable,
  createMessagesTable,
  insertUsers,
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

    console.log('Populating tables...');
    await currentClient.query(insertUsers);
    await currentClient.query(insertMessages);

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error during DB creation or population', error);
  } finally {
    await currentClient.end();
    console.log('done');
  }
};

setupDatabase();
