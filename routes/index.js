import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import loginRoutes from './login.js';
import logoutRoute from './logout.js';
import signupRoutes from './sign-up.js';
import dashboardRoutes from './dashboard.js';
import memberRoute from './become-member.js';
import adminRoute from './become-admin.js';

const appRoutes = Router();

appRoutes.get('/', isAuthenticated, (req, res, next) => {
  res.redirect('/dashboard');
});
appRoutes.use('/login', loginRoutes);
appRoutes.use('/logout', logoutRoute);
appRoutes.use('/sign-up', signupRoutes);
appRoutes.use('/dashboard', dashboardRoutes);
appRoutes.use('/become-member', memberRoute);
appRoutes.use('/become-admin', adminRoute);

export default appRoutes;
