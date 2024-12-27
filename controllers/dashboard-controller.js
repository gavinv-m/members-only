import db from '../config/db/queries.js ';

// Exports to routes/dashboard.js
export const renderDashboard = async (req, res) => {
  const messages = await db.getMessages();
  res.render('dashboard', { messages, user: req.user });
};
