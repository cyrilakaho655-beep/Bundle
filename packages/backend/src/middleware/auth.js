const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies && req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload || !payload.sub) return res.status(401).json({ error: 'Invalid token' });

    // Attach user info (id and roles). Do not fetch full user for performance unless needed.
    req.user = { id: payload.sub, roles: payload.roles || [] };
    // Optionally load user record
    try {
      const user = await User.findById(req.user.id).select('-passwordHash').lean();
      if (user) req.currentUser = user;
    } catch (e) {
      // ignore
    }

    return next();
  } catch (err) {
    console.error('Auth middleware error', err && err.message);
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || !req.user.roles || !req.user.roles.includes(role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    return next();
  };
}

module.exports = { authMiddleware, requireRole };
