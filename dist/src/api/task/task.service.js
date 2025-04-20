"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskById = exports.updateTask = exports.getTaskByTitle = exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const task_js_1 = __importDefault(require("../../models/task.js"));
const errors_js_1 = require("../../utils/errors.js");
const logger_js_1 = __importDefault(require("../../utils/logger.js"));
const createTask = async ({ title, description, project, }) => {
    try {
        const task = new task_js_1.default({ title, description, project });
        await task.save();
        return task.toObject();
    }
    catch (error) {
        logger_js_1.default.error("Error adding task:", error);
        throw new errors_js_1.CustomException(500, "Failed to add task");
    }
};
exports.createTask = createTask;
const getTasks = async (projectId) => {
    try {
        const tasks = await task_js_1.default.find({ projectId }).lean();
        return tasks;
    }
    catch (error) {
        logger_js_1.default.error("Failed to fetch tasks:", error);
        return [];
    }
};
exports.getTasks = getTasks;
const getTaskById = async (id) => {
    try {
        return await task_js_1.default.findById(id).lean();
    }
    catch (error) {
        logger_js_1.default.error("Error getting task by ID:", error);
        throw new errors_js_1.CustomException(500, "Failed to get task by ID");
    }
};
exports.getTaskById = getTaskById;
const getTaskByTitle = async (name) => {
    try {
        return await task_js_1.default.findOne({ name }).select(["-members"]).lean();
    }
    catch (error) {
        logger_js_1.default.error("Error getting task by title:", error);
        throw new errors_js_1.CustomException(500, "Failed to get task by title");
    }
};
exports.getTaskByTitle = getTaskByTitle;
const updateTask = async ({ id, title, description, status, project, }) => {
    try {
        const updatedTask = await task_js_1.default.findByIdAndUpdate(id, {
            ...(title && { title }),
            ...(description && { description }),
            ...(status && { status }),
            ...(project && { project }),
        }, { new: true });
        if (updatedTask) {
            return await (0, exports.getTaskById)(id);
        }
        return null;
    }
    catch (error) {
        logger_js_1.default.error("Error updating task:", error);
        throw new errors_js_1.CustomException(500, "Failed to update task");
    }
};
exports.updateTask = updateTask;
const deleteTaskById = async (id) => {
    try {
        return await task_js_1.default.findByIdAndDelete(id);
    }
    catch (error) {
        logger_js_1.default.error("Error deleting task:", error);
        throw new errors_js_1.CustomException(500, "Failed to delete task");
    }
};
exports.deleteTaskById = deleteTaskById;
