import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import {
  renderAdminForm,
  updateAdminStatus,
} from '../controllers/admin-controller.js';

const adminRoute = Router();

adminRoute.get('/', isAuthenticated, renderAdminForm);
adminRoute.post('/', isAuthenticated, updateAdminStatus);

// Exports to index.js
export default adminRoute;
