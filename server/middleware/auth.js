const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,"2C2uy50GkHC38nZ3");
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (err) {
            res.status(401).json({ error: 'Not authorized',err: err.message });
        }
    }

    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token' });
    }
};
