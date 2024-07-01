
module.exports = {
    companyInfo: {
        service: process.env.EMAIL_SERVICE,
        email: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    rateLimiter: {
        maxAttemptsPerEmail: 5,
        maxAttemptsPerDay: 10,
        maxAttemptsByIpUsername: 3,
    },
};