import db from '../config/db/queries.js';
import { body, matchedData, validationResult } from 'express-validator';

const validateMessage = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required.')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters.'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required.')
    .isLength({ max: 140 })
    .withMessage('Content cannot exceed 140 characters.'),
];

export const addMessage = [
  validateMessage,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array(),
      });
    }
    const data = matchedData(req);
    try {
      await db.addMessage(req.user, data);
      res.status(201).json({
        message: 'Message added successfully',
      });
    } catch (error) {
      next(error);
    }
  },
];

// Exports to routes/dashboard.js
export const renderDashboard = async (req, res) => {
  const messages = await db.getMessages();
  res.render('dashboard', { messages, user: req.user });
};
