// Exported to login.js
export const renderLogin = (req, res) => {
  const errors = req.flash('errors');
  res.render('login', { errors });
};
