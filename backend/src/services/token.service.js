const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Token = require('./token.schema');


// Access Token Generation
function generateAccessToken(userId) {
    const payload = { userId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '15m'
    });
    return token;
}

// Refresh Token Generation
function generateRefreshToken(userId) {
    const token = crypto.randomBytes(64).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    return { token, expiresAt };
}

// Token Storage
async function storeToken(token, userId, type, expiresAt) {
    const tokenDocument = new Token({
        token,
        userId,
        type,
        expiresAt
    });
    await tokenDocument.save();
}



// Token Verification
async function verifyToken(token, type) {
    try {
        const tokenDocument = await Token.findOne({ token, type });
        if (!tokenDocument) {
            return null;
        }

        if (tokenDocument.expiresAt < new Date()) {
            await tokenDocument.deleteOne();
            return null;
        }
        return tokenDocument;

    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    storeToken,
    verifyToken
};