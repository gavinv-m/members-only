import { Router } from 'express';
import { renderLogin, signInUser } from '../controllers/login-controller.js';

const loginRoutes = Router();

loginRoutes.get('/', renderLogin);
loginRoutes.post('/', signInUser);

// Exports to index.js
export default loginRoutes;
