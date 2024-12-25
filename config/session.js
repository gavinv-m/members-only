import dotenv from 'dotenv';
import pool from './db/pool.js';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

dotenv.config();

const pgSession = connectPgSimple(session);
const sessionStore = new pgSession({
  pool: pool,
  tableName: 'user_sessions',
  createTableIfMissing: true,
});

export default function sessionConfig(app) {
  app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
      },
    })
  );
}
