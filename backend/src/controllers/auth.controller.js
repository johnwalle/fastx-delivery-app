const httpStatus = require("http-status");
const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/apiError')
const authService = require('../services/auth.service')
const userService = require('../services/user.service')
const tokenTypes = require("../config/token");
const TokenService = require('../services/token.service')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { checkPasswordStrength } = require('../utils/passwordUtils')

const tokenService = new TokenService();



// login function is added to the auth controller

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password, req.connection.remoteAddress);
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const tokens = await tokenService.generateAuthTokens(user.id);
    return res.status(httpStatus.OK).send({ user, tokens });
});


// refreshToken function is added to the auth controller

const refreshToken = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuthToken(req.body.refreshToken);
    return res.status(httpStatus.OK).send({ ...tokens });
});



//Forgot Password Controller
const forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body;
    const existUser = await userService.getUserByEmail(email);
    if (!existUser) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "user Not Found" })
    }
    await tokenService.removeToken(existUser._id);
    const tokens = await tokenService.generateAuthTokens(existUser._id);
    const token = tokens.refresh.token

    await authService.sendEmail(email, token)
    return res.status(httpStatus.OK).json({ message: 'Password reset link has been sent to your email..' })
});


const resetPassword = catchAsync(async (req, res) => {
    const { token } = req.params;
    const password = req.body.password;

    // Find the token document
    const tokenDoc = await tokenService.findToken(token);
    if (!tokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, "Invalid Token");
    }

    // Verify the reset token

    const payload = jwt.verify(token, process.env.JWT_SECRET);


    // Check if the token has expired
    const hasTokenExpired = await tokenService.tokenExpired(payload.exp);
    if (hasTokenExpired) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Token expired");
    }

    // check the password's strength


    const isPasswordStrong = await checkPasswordStrength(password);
    // check password strength
    if (!isPasswordStrong) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Password is not strong enough");
    }

    // Reset the password
    const result = await authService.passwordReset(payload.sub, password);
    if (result.modifiedCount > 0) {
        // Password updated successfully
        res.status(httpStatus.OK).json({ message: "Password Reset Successfully" });
    } else {
        // User not found or password not changed
        throw new ApiError(
            httpStatus.NOT_FOUND,
            "User not found or password not changed"
        );
    }
});


module.exports = {
    login,
    refreshToken,
    forgotPassword,
    resetPassword,
};