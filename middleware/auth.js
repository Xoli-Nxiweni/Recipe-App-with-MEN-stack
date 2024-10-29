// middleware/auth.js

import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Use a capital 'U' for convention

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null; // Extract token if present

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password'); // Fetch user without password
        req.userId = decoded.id; // Store user ID
        req.userRole = decoded.role; // Store user role
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export default authMiddleware;
