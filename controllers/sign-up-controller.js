import { body, matchedData, validationResult } from 'express-validator';

const validateSignUpRequest = [
  // Validate first name
  body('firstName')
    .isLength({ min: 1 })
    .withMessage('First name is required')
    .isAlpha()
    .withMessage('First name must only contain letters'),

  // Validate last name
  body('lastName')
    .isLength({ min: 1 })
    .withMessage('Last name is required')
    .isAlpha()
    .withMessage('Last name must only contain letters'),

  // Validate username
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username must only contain letters and numbers'),

  // Validate password
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least one letter'),

  // Confirm password
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),
];

// Exported to routes/sign-up.js
export const registerUser = [
  validateSignUpRequest,
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      req.flash('errors', errors.array());
      req.flash('formData', req.body);
      return res.redirect('sign-up');
    }

    // TODO: Update database
    res.send('Form submitted successfully');
  },
];

// Exported to routes/sign-up.js
export const renderSignUp = (req, res) => {
  const errors = req.flash('errors');
  const formData = req.flash('formData')[0] || {};
  res.render('sign-up', { errors, formData });
};
