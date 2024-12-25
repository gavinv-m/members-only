import { Router } from 'express';
import {
  renderSignUp,
  registerUser,
} from '../controllers/sign-up-controller.js';

const signupRoutes = Router();

signupRoutes.get('/', renderSignUp);
signupRoutes.post('/', registerUser);

// Exports to index.js
export default signupRoutes;
