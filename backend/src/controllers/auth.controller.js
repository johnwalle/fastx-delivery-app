const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/apiError");
const authService = require("../services/auth.service");





const login = catchAsync(async (req, res) => {

    const { email, password } = req.body;

    const user = await authService.login(
        email,
        password,
        req.connection.remoteAddress
    );

    return res.status(httpStatus.OK).json({ 'user': user });

    // if (!user) {
    //     throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
    // }
    //   await tokenService.removeToken(user.id);
    // const tokens = await tokenService.generateAccessToken(user.id);
    // return res.status(httpStatus.OK).send({ user, tokens });
});



module.exports = {
    login,
};