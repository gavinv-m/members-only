import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import loginRoutes from './login.js';
import signupRoutes from './sign-up.js';

const appRoutes = Router();

appRoutes.get('/', isAuthenticated, (req, res) => {
  res.send('Working');
});
appRoutes.use('/login', loginRoutes);
appRoutes.use('/signup', signupRoutes);

export default appRoutes;
