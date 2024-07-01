const User = require("../models/user.schema");

const createUser = async (userData) => {
    const user = await User.create(userData);
    return user;
};


const getUserByEmail = async (email) => {
    const user = await User.findOne({ email: email });
    return user;
};
const getUserById = async (id) => {
    const user = await User.findOne({ _id: id }).select('-password');
    return user;
};
const getUser = async () => {
    const users = await User.find({}).sort({ updatedAt: -1 }).select('-password');
    return users;
};

const getUserByToken = async (token) => {
    const user = await User.findOne({ refreshToken: token });
    return user
}

const updateUser = async (userId, updateData) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
        }).exec();
        return updatedUser;
    } catch (error) {
        // Handle any potential error
        throw new Error("Failed to update course");
    }
};

const deleteUser = async (id) => {
    try {
        const result = await User.findByIdAndDelete(id);
        return result;
    } catch (error) {
        // Handle any potential errors
        throw new Error(error);
    }
};







module.exports = {
    createUser,
    getUser,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
    getUserByToken,
};