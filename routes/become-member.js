import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import {
  renderMemberForm,
  updateRole,
} from '../controllers/member-controller.js';

const memberRoute = Router();

memberRoute.get('/', isAuthenticated, renderMemberForm);
memberRoute.post('/', isAuthenticated, updateRole);

export default memberRoute;
