import db from '../config/db/queries.js ';

// Exports to routes/dashboard.js
export const renderDashboard = (req, res) => {
  const messages = db.getMessages();
  console.log(messages);
  res.render('dashboard');
};
