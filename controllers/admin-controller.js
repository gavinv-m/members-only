import { body, matchedData, validationResult } from 'express-validator';
import db from '../config/db/queries.js';

// Exports to routes/become-admin.js
export const updateAdminStatus = [
  body('admin-password').notEmpty().withMessage('Password must not be empty'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      req.flash('responses', errors.array());
      return res.redirect('/become-admin');
    }

    const data = matchedData(req);
    try {
      const modified = await db.modifyRole(
        req.user,
        data['admin-password'],
        'admin'
      );
      if (modified === true) {
        req.flash('responses', [{ msg: 'Welcome to the admin team!' }]);
        return res.redirect('/become-admin');
      } else {
        req.flash('responses', [{ msg: 'Not quite. Try again.' }]);
        return res.redirect('/become-admin');
      }
    } catch (error) {
      req.flash('responses', [
        { msg: 'An error occurred while updating your role.' },
      ]);
      return res.redirect('/become-admin');
    }
  },
];

// Exports to routes/become-admin.js
export const renderAdminForm = (req, res) => {
  const responses = req.flash('responses');
  res.render('admin-form', { responses });
};
