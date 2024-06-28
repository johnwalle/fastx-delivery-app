// catchAsync.js
const ApiError = require('./apiError');

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        if (err instanceof ApiError) {
            return res.status(err.statusCode).json(err);
        } else {
            next(err);
        }
    });
};

module.exports = catchAsync;