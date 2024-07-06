const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
const httpStatus = require('http-status');


const requireSignIn = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await userService.getUserById(decoded.sub);

            next();
        } else {
            res.status(httpStatus.UNAUTHORIZED).json({ message: 'Not authorized, no token' });
        }
    } catch (error) {
        console.error(error);
        res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
    }
};

const adminMiddleware = async (req, res, next) => {
    try {
        const id = req.user;
        const user = await userService.getUserById(id);
        if (user.role !== "admin") {
            return res.status(401).json({ message: "Admin access Denied" });
        }
        next();
    }
    catch (err) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: err.message });
    }
};


const superAdminMiddleware = async (req, res, next) => {
    try {
        const id = req.user;

        const user = await userService.getUserById(id);
        if (user.role !== "super-admin") {
            return res.status(401).json({ message: "Super Admin access Denied" });
        }
        next();
    }
    catch (err) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: err.message });
    }
}





module.exports = { requireSignIn, adminMiddleware, superAdminMiddleware };