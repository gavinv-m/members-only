import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import { renderAdminForm } from '../controllers/admin-controller.js';

const adminRoute = Router();

adminRoute.get('/', isAuthenticated, renderAdminForm);

// Exports to index.js
export default adminRoute;
