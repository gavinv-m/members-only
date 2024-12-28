// Exported to routes/become-member.js
export const renderMemberForm = (req, res) => {
  const errors = req.flash('errors');
  const formData = req.flash('formData')[0] || {};
  res.render('member-form', { errors, formData });
};
