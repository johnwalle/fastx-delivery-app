const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const User = require('../models/user.schema');
const Token = require('../models/token.schema');
const tokenTypes = require('../config/token');
const userService = require('./user.service');

class TokenService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET;
        if (!this.jwtSecret) {
            throw new Error('JWT secret is not defined in environment variables');
        }
    }

    generateToken(userId, expires, type) {
        const payload = {
            sub: userId,
            iat: dayjs().unix(),
            exp: dayjs(expires).unix(),
            type,
        };
        return jwt.sign(payload, this.jwtSecret);
    }

    async generateAuthTokens(userId) {
        console.log('token-types', tokenTypes.ACCESS, tokenTypes.REFRESH)
        const accessTokenExpires = dayjs().add(1, 'hour');
        const accessToken = this.generateToken(userId, accessTokenExpires, tokenTypes.ACCESS);

        const refreshTokenExpires = dayjs().add(7, 'days');
        const refreshToken = this.generateToken(userId, refreshTokenExpires, tokenTypes.REFRESH);

        await this.saveRefreshToken(
            refreshToken,
            userId,
            refreshTokenExpires,
            tokenTypes.REFRESH
        );

        return {
            access: {
                token: accessToken,
                expires: accessTokenExpires.toDate(),
            },
            refresh: {
                token: refreshToken,
                expires: refreshTokenExpires.toDate(),
            },
        };
    }

    async saveRefreshToken(token, userId, expires, type, blacklisted = false) {
        const tokenDoc = await Token.create({
            token,
            user: userId,
            expires: expires.toDate(),
            type,
            blacklisted,
        });
        return tokenDoc;
    }

    async findUser(token) {
        const payload = jwt.verify(token, this.jwtSecret);
        const user = await User.findById(payload.sub);
        return user;
    }


    async verifyToken(token, type) {
        try {
            const payload = jwt.verify(token, this.jwtSecret);
            if (payload.type === type) {
                const token = await Token.findOne({
                    user: payload.sub,
                    type,
                    expires: { $gt: new Date() },
                });
                if (token) {
                    const user = await userService.getUserById(payload.sub);
                    return user;
                }
            }
            return null;
        } catch (err) {
            return null;
        }
    }


    async generateResetToken(userId) {
        const resetTokenExpires = dayjs().add(1, 'day');
        const resetToken = this.generateToken(userId, resetTokenExpires, tokenTypes.RESET_PASSWORD);
        await this.saveResetToken(userId, resetToken);
        return resetToken;
    }

    async saveResetToken(userId, token) {
        await Token.updateOne(
            { user: userId, type: tokenTypes.RESET_PASSWORD },
            { token, expiresAt: dayjs().add(1, 'day').toDate() },
            { upsert: true }
        );
    }


    // remove the token from the database
    async removeToken(userId) {
        try {
            const result = await Token.deleteOne({ user: userId });
            return result;
        } catch (error) {
            console.error('Error removing token:', error);
            throw error;
        }
    }

    async findToken(token) {
        const token2 = await Token.find({ token: token })
        return token2
    }
    async tokenExpired(tokenExp) {
        // Get the current date and time
        const currentDate = new Date();
        // Parse the expiration date from the token
        const expirationDate = dayjs.unix(tokenExp).toISOString();
        return currentDate > expirationDate;
    }


}

module.exports = TokenService;
