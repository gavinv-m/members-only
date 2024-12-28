import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import { renderMemberForm } from '../controllers/member-controller.js';

const memberRoute = Router();

memberRoute.get('/', isAuthenticated, renderMemberForm);

export default memberRoute;
