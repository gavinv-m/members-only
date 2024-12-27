import { Router } from 'express';
import { renderDashboard } from '../controllers/dashboard-controller.js';
import { isAuthenticated } from '../utils/auth.js';

const dashboardRoutes = Router();

dashboardRoutes.get('/', isAuthenticated, renderDashboard);

export default dashboardRoutes;
