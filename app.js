import express from 'express';
import sessionConfig from './config/session.js';
import passport from './config/passport.js';
import path from 'node:path';

const app = express();
app.use(express.urlencoded({ extended: true })); // Parsing forms
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

// Set up session
sessionConfig(app);

// Initialise passport and passport session
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000);
