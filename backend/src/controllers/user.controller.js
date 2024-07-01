const User = require('../models/user.schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const httpStatus = require("http-status");
const userService = require('../services/user.service')
const ApiError = require('../utils/apiError')
const catchAsync = require('../utils/catchAsync')
const { checkPasswordStrength } = require('../utils/passwordUtils')

// REGISTER NEW USER
// UNPROTECTED ROUTE
// POST /api/users/register

const registerUser = catchAsync(async (req, res) => {

    const { fullName, email, password } = req.body;


    // check if the fields are empty

    if (!email || !password || !fullName) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Please fill all the fields");
    }

    //check if user already exists

    const userExists = await userService.getUserByEmail(email);

    if (userExists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken");
    }


    //check if the fullname containns both the first name and last name

    if (fullName.split(' ').length < 2) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Please enter both first name and last name"
        )

    }

    const isPasswordStrong = await checkPasswordStrength(password);
    // check password strength
    if (!isPasswordStrong) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Password is not strong enough");
    }

    // hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt);



    // create new user

    const user = {
        fullName,
        email,
        password: hashedPassword
    }

    await userService.createUser(user);
    // send response
    res.status(httpStatus.CREATED).json({
        success: true,
        message: 'User created successfully'
    });
});




// LOGIN USER
// UNPROTECTED ROUTE
// POST /api/users/login

const loginUser = async (req, res) => {

    const { email, password } = req.body

    // check if the fields are empty

    if (!email || !password) {
        res.status(400).json({ message: 'Please fill all the fields.' })
    }

    // check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: 'Invalid email' })
    }

    // check if the user password is correct
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' })
    }

    // send response
    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: genToken(user._id)
    });
}

// GET USER PROFILE
// PROTECTED ROUTE
// GET /api/users/profile

// const getUserProfile = async (req, res) => {

//     const user = await User.findOne({ _id: req.user._id })
//     if (user) {
//         res.status(200).json({
//             _id: user._id,
//             fullName: user.fullName,
//             email: user.email
//         })
//     } else {
//         res.status(404).json({ message: 'User not found' })
//     }
// }

//get user by id
//unprotected route
//GET /api/users/:id

const getUserById = catchAsync(async (req, res) => {

    const { id } = req.params;
    const user = await userService.getUserById(id);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    res.status(httpStatus.OK).json(user);

})



// getting all users
// unprotected route
// GET /api/users

const getAllUsers = catchAsync(async (req, res) => {
    const users = await userService.getUser();
    res.status(httpStatus.OK).json(users);
})


const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    // getUserProfile,
    getUserById,
    getAllUsers
}