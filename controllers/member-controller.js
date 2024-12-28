import { body, matchedData, validationResult } from 'express-validator';
import db from '../config/db/queries.js';

// Exported to routes/become-member.js
export const updateRole = [
  body('member-password').notEmpty().withMessage('Password must not be empty'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty() === false) {
      req.flash('responses', errors.array());
      return res.redirect('/become-member');
    }

    const data = matchedData(req);
    try {
      const modified = await db.modifyRole(
        req.user,
        data['member-password'],
        'member'
      );
      if (modified === true) {
        req.flash('responses', [{ msg: 'Welcome to the club!' }]);
        return res.redirect('/become-member');
      } else {
        req.flash('responses', [{ msg: 'Not quite. Try again.' }]);
        return res.redirect('/become-member');
      }
    } catch (error) {
      req.flash('responses', [
        { msg: 'An error occurred while updating your role.' },
      ]);
      return res.redirect('/become-member');
    }
  },
];

// Exported to routes/become-member.js
export const renderMemberForm = (req, res) => {
  const responses = req.flash('responses');
  res.render('member-form', { responses });
};
