const httpStatus = require("http-status");
const userService = require("../services/user.service");
const ApiError = require("../utils/apiError");
const { emailIpBruteLimiter, slowerBruteLimiter, emailBruteLimiter } = require("../Middleware/auth.limiter");
const bcrypt = require('bcryptjs');
const TokenService = require("../services/token.service");
const nodemailer = require("nodemailer");
const tokenTypes = require("../config/token");
const config = require("../config/config");
const User = require("../models/user.schema");


const tokenService = new TokenService();

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

const refreshAuthToken = async (refreshToken) => {
    const user = await tokenService.verifyToken(
        refreshToken,
        tokenTypes.REFRESH
    );

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "user Not Found");
    }
    await tokenService.removeToken(user._id);
    return await tokenService.generateAuthTokens(user._id);
};

const sendEmail = async (recipientEmail, resetToken) => {

    console.log('email-password', config.companyInfo.pass)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Replace with your SMTP server address
        port: 587, // Replace with your SMTP server port
        secure: false, // Set to true if using a secure connection (SSL/TLS)
        service: config.companyInfo.service,
        auth: {
            user: config.companyInfo.email,
            pass: config.companyInfo.pass,
        },
    });
    const mailOptions = {
        from: config.companyInfo.email,
        to: recipientEmail,
        subject: "Password Reset",
        text: `Please use the following tLink to reset your password: http://localhost:3000/reset-password/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error sending password reset email:", error);
            // throw new ApiError(
            //     httpStatus.UNAUTHORIZED,
            //     "Incorrect email or password"
            // );
        } else {
            console.log("Password reset email sent:", info.response);
        }
    });
};


const passwordReset = async (user, pass) => {
    console.log('user', user, 'pass', pass)
    const hashedPassword = await bcrypt.hash(pass, 12);
    const result = await User.updateOne(
        { _id: user }, // Filter to match the user with the specified ID
        { $set: { password: hashedPassword } } // Update the password field with the new value
    );
    return result;
};





module.exports = {
    login,
    refreshAuthToken,
    sendEmail,
    passwordReset
};