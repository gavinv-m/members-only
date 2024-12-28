import { Router } from 'express';
import {
  addMessage,
  renderDashboard,
} from '../controllers/dashboard-controller.js';
import { isAuthenticated } from '../utils/auth.js';

const dashboardRoutes = Router();

dashboardRoutes.get('/', isAuthenticated, renderDashboard);
dashboardRoutes.post('/', isAuthenticated, addMessage);

// Exports to index.js
export default dashboardRoutes;
