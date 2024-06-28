const httpStatus = require("http-status");
const userService = require("../services/user.service");
const ApiError = require("../utils/apiError");
const { emailIpBruteLimiter, slowerBruteLimiter, emailBruteLimiter } = require("../Middleware/auth.limiter");
const bcrypt = require('bcryptjs');

const login = async (email, password, ipAddr) => {
    
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            await Promise.all([
                emailIpBruteLimiter.consume(`${email}_${ipAddr}`),
                slowerBruteLimiter.consume(ipAddr),
                emailBruteLimiter.consume(email),
            ]);
            throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            await Promise.all([
                emailIpBruteLimiter.consume(`${email}_${ipAddr}`),
                slowerBruteLimiter.consume(ipAddr),
                emailBruteLimiter.consume(email),
            ]);
            throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
        }

        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    login,
};