import express from 'express';
import sessionConfig from './config/session.js';

const app = express();
app.use(express.urlencoded({ extended: true })); // Parsing forms

// Set up session
sessionConfig(app);

app.listen(3000);
