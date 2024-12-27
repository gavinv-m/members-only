import { body, validationResult } from 'express-validator';
import passport from '../config/passport.js';

const validateLogInRequest = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const signInUser = [
  validateLogInRequest,
  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      req.flash('errors', errors.array());
      return res.redirect('/login');
    }

    // Execute the passport authentication
    return passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true,
      successRedirect: '/',
    })(req, res, next);
  },
];

// Exported to login.js
export const renderLogin = (req, res) => {
  const errors = req.flash('error');
  res.render('login', { errors });
};
