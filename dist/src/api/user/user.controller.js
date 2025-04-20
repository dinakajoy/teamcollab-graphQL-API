"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.getUserController = exports.getUsersController = exports.addUserController = void 0;
const user_service_1 = require("./user.service");
const bcryptUtils_1 = require("../../utils/bcryptUtils");
const errors_1 = require("../../utils/errors");
const logger_1 = __importDefault(require("../../utils/logger"));
const addUserController = async (name, email, password) => {
    try {
        const existingUser = await (0, user_service_1.getUserByEmail)(email);
        if (existingUser)
            throw new errors_1.AlreadyExistingUserException();
        const hashedPassword = await (0, bcryptUtils_1.hashString)(password);
        return await (0, user_service_1.addUser)({ name, email, password: hashedPassword });
    }
    catch (error) {
        logger_1.default.error("addUserController - Error adding user:", error);
        throw new errors_1.CustomException(500, "Failed to add user");
    }
};
exports.addUserController = addUserController;
const getUsersController = async () => {
    try {
        return await (0, user_service_1.getUsers)();
    }
    catch (error) {
        logger_1.default.error("getUsersController - Failed to fetch users:", error);
        throw new errors_1.CustomException(500, "Failed to fetch users");
    }
};
exports.getUsersController = getUsersController;
const getUserController = async (id) => {
    try {
        return await (0, user_service_1.getUserById)(id);
    }
    catch (error) {
        logger_1.default.error("getUserController - Error getting user:", error);
        throw new errors_1.CustomException(500, "Failed to get user");
    }
};
exports.getUserController = getUserController;
const updateUserController = async (id, name, email, role) => {
    try {
        const existingUser = await (0, user_service_1.getUserById)(id);
        if (!existingUser)
            throw new Error("User don't exist");
        const user = await (0, user_service_1.updateUser)({ id, name, email, role });
        return user;
    }
    catch (error) {
        logger_1.default.error("updateUserController - Error updating user:", error);
        throw new errors_1.CustomException(500, "Failed to update user");
    }
};
exports.updateUserController = updateUserController;
const deleteUserController = async (id) => {
    try {
        const existingUser = await (0, user_service_1.getUserById)(id);
        if (!existingUser)
            throw new Error("User don't exist");
        await (0, user_service_1.deleteUserById)(id);
        return "User deleted successfully";
    }
    catch (error) {
        logger_1.default.error("deleteUserController - Error deleting user:", error);
        throw new errors_1.CustomException(500, "Failed to delete user");
    }
};
exports.deleteUserController = deleteUserController;
