require('dotenv').config();
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send('Invalid or expired token.');
    }
}

module.exports = authMiddleware;