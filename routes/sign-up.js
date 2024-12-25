import { Router } from 'express';
import { renderSignUp } from '../controllers/sign-up-controller.js';

const signupRoutes = Router();

signupRoutes.get('/', renderSignUp);
signupRoutes.post('/');

// Exports to index.js
export default signupRoutes;
