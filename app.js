import express from 'express';
import sessionConfig from './config/session.js';
import passport from './config/passport.js';

const app = express();
app.use(express.urlencoded({ extended: true })); // Parsing forms

// Set up session
sessionConfig(app);

// Initialise passport and passport session
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000);
