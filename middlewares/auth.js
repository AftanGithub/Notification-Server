const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

exports.authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided!' });

  try {
    const decoded = jwt.verify(token, jwtConfig.secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
