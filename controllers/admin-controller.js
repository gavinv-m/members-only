// Exports to routes/become-admin.js
export const renderAdminForm = (req, res) => {
  const responses = req.flash('responses');
  res.render('admin-form', { responses });
};
