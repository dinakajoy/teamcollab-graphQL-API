"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUser = exports.getUserByEmail = exports.getUserById = exports.getUsers = exports.addUser = void 0;
const user_1 = __importDefault(require("../../models/user"));
const errors_1 = require("../../utils/errors");
const logger_1 = __importDefault(require("../../utils/logger"));
const addUser = async ({ name, email, password, }) => {
    try {
        const user = new user_1.default({ name, email, password });
        await user.save();
        return user.toObject();
    }
    catch (error) {
        logger_1.default.error("Error adding user:", error);
        throw new errors_1.CustomException(500, "Failed to add user");
    }
};
exports.addUser = addUser;
const getUsers = async () => {
    try {
        const users = await user_1.default.find()
            .select(["-password", "-refreshToken"])
            .lean();
        return users;
    }
    catch (error) {
        logger_1.default.error("Failed to fetch users:", error);
        throw new errors_1.CustomException(500, "Failed to fetch users");
    }
};
exports.getUsers = getUsers;
const getUserById = async (id) => {
    try {
        return await user_1.default.findById(id).select("-password").lean();
    }
    catch (error) {
        logger_1.default.error("Error getting user by ID:", error);
        throw new errors_1.CustomException(500, "Failed to get user by ID");
    }
};
exports.getUserById = getUserById;
const getUserByEmail = async (email) => {
    try {
        return await user_1.default.findOne({ email })
            .select(["-password", "-refreshToken"])
            .lean();
    }
    catch (error) {
        logger_1.default.error("Error getting user by email:", error);
        throw new errors_1.CustomException(500, "Failed to get user by email");
    }
};
exports.getUserByEmail = getUserByEmail;
const updateUser = async ({ id, name, email, role, password, refreshToken, }) => {
    try {
        const updatedUser = await user_1.default.findByIdAndUpdate(id, {
            ...(name && { name }),
            ...(email && { email }),
            ...(role && { role }),
            ...(password && { password }),
            ...(refreshToken && { refreshToken }),
        }, { new: true });
        if (updatedUser) {
            return await (0, exports.getUserById)(id);
        }
        return null;
    }
    catch (error) {
        logger_1.default.error("Error updating user:", error);
        throw new errors_1.CustomException(500, "Failed to update user");
    }
};
exports.updateUser = updateUser;
const deleteUserById = async (id) => {
    try {
        return await user_1.default.findByIdAndDelete(id);
    }
    catch (error) {
        logger_1.default.error("Error deleting user:", error);
        throw new errors_1.CustomException(500, "Failed to delete user");
    }
};
exports.deleteUserById = deleteUserById;
