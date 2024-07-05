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


// GET USER PROFILE
// PROTECTED ROUTE
// GET /api/users/profile

const getUserProfile = catchAsync(async (req, res) => {

    const user = await userService.getUserById(req.user._id);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    res.status(httpStatus.OK).json(user);

}
)


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


// deleting a user 
const deleteUser = catchAsync(async (req, res) => {
    const userId = req.user._id.toString();
    const { id } = req.params;

    if (userId !== id) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized to delete this user");
    }
    const user = await userService.deleteUser(id);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    res.status(httpStatus.OK).json({ message: "User deleted successfully" });
});



// update user data

const updateUser = catchAsync(async (req, res) => {
    const userId = req.user._id.toString();
    const { id } = req.params;
    const { fullName, email } = req.body;

    if (userId !== id) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized to update this user");
    }

    const user = await userService.getUserById(id);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    // Check if the fullName contains both the first name and last name

    const isFullNameValid = fullName && fullName.split(' ').length >= 2;

    if (fullName && !isFullNameValid) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Full name must contain both first and last name");
    }

    const userData = {
        fullName,
        email
    }

    // check if the email is already taken

    const userExists = await userService.getUserByEmail(email);

    if (userExists && userExists._id.toString() !== id) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken");
    }
    
    const updatedUser = await userService.updateUser(id, userData);

    res.status(httpStatus.OK).json({
        message: "User updated successfully",
        updatedUser: updatedUser
    });
});



module.exports = {
    registerUser,
    getUserProfile,
    getUserById,
    getAllUsers,
    deleteUser,
    updateUser
}