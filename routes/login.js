import { Router } from 'express';
import { renderLogin } from '../controllers/login-controller.js';

const loginRoutes = Router();

loginRoutes.get('/', renderLogin);
loginRoutes.post('/');

// Exports to index.js
export default loginRoutes;
