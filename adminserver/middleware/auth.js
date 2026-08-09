const jwt = require('jsonwebtoken');

function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');

  if (!token || !process.env.JWT_SECRET) {
    return res.status(401).json({ success: false, message: 'Authentication is required.' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const adminEmails = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    if (!adminEmails.includes(user.email?.toLowerCase())) {
      return res.status(403).json({ success: false, message: 'Administrator access is required.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
}

module.exports = requireAdmin;
