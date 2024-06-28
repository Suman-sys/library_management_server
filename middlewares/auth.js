const jwt = require('jsonwebtoken');
const User = require('../model/User');

const auth = async (req, res, next) => {
    const token = req.header('Authentication')
    if (!token) return res.status(401).json({ message: 'No token, access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = { auth, admin };
