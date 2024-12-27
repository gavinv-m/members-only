import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import loginRoutes from './login.js';
import signupRoutes from './sign-up.js';

const appRoutes = Router();

appRoutes.get('/', isAuthenticated, (req, res, next) => {
  res.send('Working'); // TODO: Render dashboard
});
appRoutes.use('/login', loginRoutes);
appRoutes.use('/sign-up', signupRoutes);

export default appRoutes;
