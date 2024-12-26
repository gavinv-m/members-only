import { body, validationResult } from 'express-validator';
import passport from '../config/passport.js';

const validateLogInRequest = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Exports to login.js
export const signInUser = [
  validateLogInRequest,
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      req.flash('errors', errors.array());
      return res.redirect('/login');
    }

    passport.authenticate('local', {
      failureRedirect: '/login',
      successRedirect: '/',
    });
  },
];

// Exported to login.js
export const renderLogin = (req, res) => {
  const errors = req.flash('errors');
  res.render('login', { errors });
};
