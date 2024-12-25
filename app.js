import express from 'express';
import sessionConfig from './config/session.js';
import passport from './config/passport.js';
import path from 'node:path';
import appRoutes from './routes/index.js';
import flash from 'connect-flash';

const app = express();
app.use(express.urlencoded({ extended: true })); // Parsing forms
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'ejs');

// Set up session
sessionConfig(app);

// Initialise passport and passport session
app.use(passport.initialize());
app.use(passport.session());

// Initialize flash middleware
app.use(flash());

// Routes
app.use('/', appRoutes);

app.listen(3000);
