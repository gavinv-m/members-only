import { Router } from 'express';
import { isAuthenticated } from '../utils/auth.js';
import db from '../config/db/queries.js';

const deleteMessageRoute = Router();

deleteMessageRoute.post('/', isAuthenticated, async (req, res) => {
  const messageID = req.body.messageID;
  try {
    await db.deleteMessage(messageID);
    return res.json({ redirect: '/dashboard' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// Exports to index.js
export default deleteMessageRoute;
